/**
 * @class Article
 * @description Classe de Inicialização do componente Article
 */
export default class Article {
    /**
     * @memberof Article
     * @method constructor
     * @returns {Void}
     */
    constructor({tools}) {
        this.default = {
            post : {
                slug : tools.request.params.post
            }
        };
    }

    /**
     * @memberof Article
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados de configuração do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools, config}) {
        const {data} = await tools.axios.get(config.api + '/posts/?_embed&fields=_embedded,link,content,title&slug=' + this.data.post.slug);
        await this.update('post', data[0]);
        delete this.data.post._embedded;
        delete this.data.post.link;

        return next(this.data);
    }
}
