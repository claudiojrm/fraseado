/**
 * @class Post
 * @description Classe de Inicialização do componente Post
 */
export default class Post {
    /**
     * @memberof Category
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados do config
     * @returns {Function}
     */
    async _dispatch({next, tools, config}) {
        this.data.link = config.base + this.data.link;
        this.data.excerpt = tools.String.stripTags(this.data.content);
        this.data.excerpt = tools.String.limitWords(this.data.excerpt);

        if(this.data.thumbnail) {
            this.data.thumbnail = config.uploads + (this.data.thumbnail || '').replace(/.jpg$/, '-360x270$&');
        }

        next(this.data);
    }
}
