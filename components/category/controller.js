/**
 * @class Category
 * @description Classe de Inicialização do componente Category
 */
export default class Category {
    /**
     * @memberof Category
     * @method constructor
     * @param {Object} tools Tools do projeto
     * @returns {Void}
     */
    constructor({tools}) {
        this.default = {
            category : tools.request.params.sub,
            page : tools.request.params.page || 1,
            posts : []
        };
    }

    /**
     * @memberof Category
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados de configuração do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools, config}) {
        const {data:[category]} = await tools.axios.get(config.api + '/categories/?fields=id,name,slug,count,description,link&slug=' + this.data.category);
        const {data} = await tools.axios.get(config.api + '/posts/?_embed&fields=_embedded,link,content,title&page='+this.data.page+'&categories='+category.id);

        for(const post of data) {
            delete post._embedded['wp:term'];
            await this.update('post', post);
            delete post._embedded;

            // adiciona o post na listagem
            this.data.posts.push(post);
        }

        // dados da categoria
        category.link = category.link.replace(config.proxy, '');
        this.data.category = category;

        return next(this.data);
    }
}
