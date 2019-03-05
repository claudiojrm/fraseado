/**
 * @class Category
 * @description Classe de Inicialização do componente Category
 */
export default class Category {
    /**
     * @memberof Category
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {
            category : {
                name : 'Bom dia',
                description : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.   '
            },
            posts : [
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg'
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg'
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg'
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg'
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg'
                }
            ]
        };
    }

    /**
     * @memberof Category
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        return next(this.data);
    }
}
