/**
 * @class Menu
 * @description Classe de Inicialização do componente Menu
 */
export default class Menu {
    /**
     * @memberof Menu
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {};
    }

    /**
     * @memberof Menu
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        return next(this.data);
    }
}
