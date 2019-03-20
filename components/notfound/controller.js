/**
 * @class NotFound
 * @description Classe de Inicialização do componente NotFound
 */
export default class NotFound {
    /**
     * @memberof NotFound
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {
            title : '404'
        };
    }

    /**
     * @memberof NotFound
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        await this.update('metatags', {});
        next(this.data);
    }
}
