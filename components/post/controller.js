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
     * @returns {Function}
     */
    async _dispatch({next, tools}) {
        this.data.thumbnail = this.data.thumbnail.replace(/.jpg$/, '-300x225$&');
        this.data.excerpt = tools.String.stripTags(this.data.content);
        this.data.excerpt = tools.String.limitWords(this.data.excerpt);

        next(this.data);
    }
}
