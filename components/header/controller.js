/**
 * @class Header
 * @description Classe de Inicialização do componente Header
 */
export default class Header {
    /**
     * @memberof Header
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {};
    }

    /**
     * @memberof Header
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        return next(this.data);
    }
}
