// node modules import
import React from 'react';
import { renderToString } from 'react-dom/server';
import compression from 'compression';
import axios from 'axios';
import { isArray, mergeWith } from 'lodash';

// import arquivos do projeto
import App from '../components/app/view';
import NotFound from '../components/notfound/view';
import config from '../config';
import { routes } from '../routes';
import { tools } from './tools';

/**
 * @class Core
 * @description Classe de Inicialização do projeto
 */
export default class Core {
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
                    // adiciona o request, axios ao objeto de tools
                    tools.request = request;
                    tools.axios = axios;

                    let data = {};
                    let name = routes[route];

                    // carrega um outro componente conforme o parâmetro "name"
                    if(request.query.name) {
                        name = request.query.name;
                    }

                    // altera o "data" do componente conforme o parâmetro data
                    if('json' in tools.request.query) {
                        try {
                            data = request.query.data && JSON.parse(request.query.data);
                        } catch(e) {}
                    }

                    return await this.getComponent({ response, name, data });
                }
            });
        }

        return data;
    }

    /**
     * @memberof Core
     * @method render
     * @description Método responsável renderizar a view do component
     * @param {Object} response Contêm informações de resposta da página
     * @param {Object} name Nome do componente
     * @param {Object} data Dados de configurações do componente
     * @params {React} View View react do componente
     * @param {Object} error Retorna os erros da página
     * @returns {String}
     */
    render({response, name, data, View}, error) {
        // captura os erros do componente
        if(error) {
            response.status(500);
            return response.send(this.error(error));
        }

        // redirect
        if('redirect' in data) {
            return response.redirect(...data.redirect);
        }

        // 404
        if('notfound' in data || name == 'notfound') {
            View = NotFound;
            response.status(404);
        }

        // dados que serão utilizados pelos componentes
        const props = this.getPropsData(data);
        props.config = (({base, pub, uploads, ga}) => ({base, pub, uploads, ga}))(config);

        // render view componente
        const app = renderToString(
            <App data={props} metatags={data.metatags || {}} name={name} query={tools.request.query}>
                <View {...props} />
            </App>
        );

        // identifica se o retorno da página deve ter o formato json
        if('json' in tools.request.query) {
            const send = {};

            // retorna os dados do componente
            if(Object.keys(props || {}).length) {
                send.data = props;
            }

            // retorna o markup renderizado do componente
            if('body' in tools.request.query) {
                send.body = app;
            }

            return response.send(send);
        } else {
            return response.send(app);
        }
    }

    /**
     * @memberof Core
     * @method getPropsData
     * @description Método responsável por retornar os dados das props que serão utilizadas pelo componente
     * @param {Object} data Dados de configurações do componente
     * @returns {Object}
     */
    getPropsData(data) {
        if('notfound' in data) {
            return {...data.notfound, notfound: true };
        } else if('props' in data || 'json' in tools.request.query && 'propsJson' in data) {
            const props = 'json' in tools.request.query && data.propsJson || data.props;
            return (props || []).reduce((obj, prop) => ({...obj, [prop] : data[prop]}), {});
        } else {
            return (({metatags, ...rest}) => rest)(data);
        }
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
        return await this.getComponent({ name, data, options });
    }

    /**
     * @memberof Core
     * @method getComponent
     * @description Método que configura o componente (controller, view, merges), após o retorno de toda estrutura renderiza o componente principal.
     * @params {Object} response Informações de resposta da página (express object)
     * @params {String} name Nome do componente
     * @params {Object} data Dados do componentes
     * @params {Object} options
     * @params {String} options.alias Alias do componente
     * @returns {Void}
     */
    async getComponent({response, name, data, options}) {
        // view do componente
        let View;
        try {
            View = require(`../components/${name}/view`).default;
        } catch(e) {}

        try {
            // nova instância da controller do componente
            const Controller = new (require(`../components/${name}/controller`).default)({
                config,
                tools
            });

            // merge da configuração default do componente + config
            Controller.data = mergeWith(
                {},
                (Controller.default || {}),
                (data || {}),
                (((config || {}).components || {})[name] || {}),
                (dest, src) => {
                    if(isArray(dest)) {
                        src.forEach((item) => {
                            // identifica o índice baseado na prop name, override
                            const index = dest.findIndex(({name, override}) => item.name == name && override);

                            if(index != -1) {
                                // sobrescreve o objeto no array de destino
                                dest[index] = item;
                            } else {
                                // adiciona o objeto ao array de destino
                                dest.push(item);
                            }
                        });

                        return dest;
                    }
                }
            );

            // método para atualizar os dados do componente
            Controller.update = this.update;

            // método que configura o componente
            Controller.getComponent = this.getComponent;

            // método que configura o objeto de props
            Controller.getPropsData = this.getPropsData;

            // dados para componente que são renderizados a partir do componente principal
            const slot = d => {
                const props = this.getPropsData(d);

                if((Object.keys(props) || []).length) {
                    this.data[(options || {}).alias || name] = props;
                }
            };

            // dispara _dispatch do component
            if(Controller._dispatch) {
                await Controller._dispatch({
                    tools,
                    config,
                    next: (dt) => (response ? this.render({ response, name, data : dt, View }) : slot(dt))
                });
            } else {
                response ? this.render({ response, name, data : Controller.data, View }) : slot(Controller.data);
            }
        } catch(e) {
            console.log(e);
            this.render({response}, e);
        }
    }
}