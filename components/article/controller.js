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
                title : 'Tenha um bom dia',
                excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                thumbnail : 'uploads/natal.jpg',
                categories : {
                    name : 'Bom dia',
                    link : '/frases/bom-dia'
                }
            }
        };
    }

    /**
     * @memberof Article
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        return next(this.data);
    }
}
