/**
 * @class Home
 * @description Classe de Inicialização do componente Home
 */
export default class Home {
    /**
     * @memberof Home
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {
            posts : []
        };
    }

    /**
     * @memberof Home
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados de configuração do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools, config}) {
        const {data} = await tools.axios.get(config.api + '/posts/?_embed&fields=_embedded,link,content,title');

        for(const post of data) {
            await this.update('post', post);
            delete post._embedded;

            // adiciona o post na listagem
            this.data.posts.push(post);
        }

        return next(this.data);
    }
}
