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
            posts : [
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg',
                    categories : {
                        name : 'Bom dia',
                        link : '/frases/bom-dia'
                    }
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg',
                    categories : {
                        name : 'Bom dia',
                        link : '/frases/bom-dia'
                    }
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg',
                    categories : {
                        name : 'Bom dia',
                        link : '/frases/bom-dia'
                    }
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg',
                    categories : {
                        name : 'Bom dia',
                        link : '/frases/bom-dia'
                    }
                },
                {
                    link : '/frases/bom-dia/ola',
                    excerpt : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                    thumbnail : 'uploads/natal.jpg',
                    categories : {
                        name : 'Bom dia',
                        link : '/frases/bom-dia'
                    }
                }
            ]
        };
    }

    /**
     * @memberof Home
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        return next(this.data);
    }
}
