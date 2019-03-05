// node modules import
import React from 'react';
import { renderToString } from 'react-dom/server';
import compression from 'compression';
import extend from 'extend';
import axios from 'axios';

// import arquivos do projeto
import config from '../config';
import { routes } from '../routes';
import { tools } from './tools';
import manifest from '../public/dist/bundle/manifest.json';

// path da api
config.api = config.proxy + Object.values(config.params).join('');

/**
 * @class Core
 * @description Classe de Inicialização do projeto
 */
class Core {
    /**
     * @memberof Core
     * @method config
     * @description Método responsável por retornar as configurações de inicialização do express
     * @params {Function} stc Middleware express
     * @returns {Object}
     */
    express(stc) {
        return {
            use : [
                { key : compression },
                { key : '/public', value : stc('public') },
                { key : '/service-worker.js', value : stc(`${config.dist}/service-worker.js`) }
            ],
            get : this.routes(),
            set : [
                { key : 'views', value : __dirname + '/../components' },
                { key : 'view cache', value : true }
            ]
        };
    }

    /**
     * @memberof Core
     * @method routes
     * @description Método responsável pela configuração das rotas do projeto e instanciar a controller do componente conforme sua rota
     * @returns {Array}
     */
    routes() {
        const data = [];

        for(const route in routes) {
            data.push({
                key : route,
                value : async (request, response) => {
                    // adiciona o request a tools de request
                    tools.request = request;

                    // define o token para os request via axios e adiciona no objeto de tools
                    await this.setToken();
                    tools.axios = axios;

                    const {name, Component} = routes[route];
                    return await this.instance({ response, name, Component });
                }
            });
        }

        return data;
    }

    /**
     * @memberof Core
     * @method setToken
     * @description Método responsável por retornar o token da api
     * @returns {String}
     */
    async setToken() {
        const { data : { token } } = await axios.post(config.proxy + config.params.json + '/jwt-auth/v1/token', config.jwt);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    /**
     * @memberof Core
     * @method render
     * @description Método responsável renderizar a view do component
     * @param {Object} response Contêm informações de resposta da página
     * @param {Object} name Nome do componente
     * @param {Object} data Dados de configurações do componente
     * @params {React} Component View react do componente
     * @param {Object} error Retorna os erros da página
     * @returns {String}
     */
    render({response, name, data, Component}, error) {
        if(error) {
            return response.send(this.error(error));
        }

        const context = Object.assign(data, {
            Page : {
                STARKData : JSON.stringify(data),
                components : JSON.stringify(Object.keys(manifest).filter(cp => [name, 'page'].includes(cp.split(/-(script|style)/)[0]))),
                main : manifest['main.js']
            }
        });

        return response.send(
            renderToString(
                <Component {...context} />
            )
        );
    }

    /**
     * @memberof Core
     * @method error
     * @description Método responsável por retornar error na aplicação
     * @param {Object} error Retorna os erros da página
     * @returns {String}
     */
    error(error) {
        return '<h1>Application error</h1>' + error.toString();
    }
    /**
     * @memberof Core
     * @method update
     * @description Método responsável por atualizar os dados do componente
     * @params {String} name Nome do componente
     * @params {Object} data Dados do componentes
     * @params {Object} options
     * @params {String} options.alias Alias do componente
     * @returns {Object}
     */
    async update(name, data, options) {
        // set data componente
        this.data[(options || {}).alias || name] = data;
        return await this.instance({ name, data, options });
    }

    /**
     * @memberof Core
     * @method instance
     * @description Método que configura a instância (controller) do componente e renderiza o componente principal, além de aplicar regras de merges de data
     * @params {Object} response Informações de resposta da página (express object)
     * @params {String} name Nome do componente
     * @params {Object} data Dados do componentes
     * @params {Object} options
     * @params {String} options.alias Alias do componente
     * @params {React} Component View react do componente
     * @returns {Void}
     */
    async instance({response, name, data, options, Component}) {
        try {
            // nova instância da controller do componente
            const Controller = new (require(`../components/${name}/controller`).default)({
                config,
                tools
            });

            // merge da configuração default do componente + config
            Controller.data = extend(
                (Controller.default || {}),
                (data || {}),
                (((config || {}).components || {})[name] || {})
            );

            // método para atualizar os dados do componente
            Controller.update = this.update;

            // instancia do componente
            Controller.instance = this.instance;

            // dispara _dispatch do component
            if(Controller._dispatch) {
                await Controller._dispatch({
                    tools,
                    config,
                    next: (dt) => {
                        // first render (view jsx)
                        if(response) {
                            this.render({ response, name, data : extend(Controller.data, dt), Component });
                        } else {
                            const alias = (options || {}).alias || name;
                            this.data[alias] = extend(this.data[alias], dt);
                        }
                    }
                });
            } else {
                this.render({ response, name, data : Controller.data, Component });
            }
        } catch(e) {
            console.log(e);
            this.render({response}, e);
        }
    }
}

export default Core;
