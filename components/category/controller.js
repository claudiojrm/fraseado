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
            slug : tools.request.params.sub,
            category : {
                name : 'não tem'
            },
            posts : []
        };
    }

    /**
     * @memberof Category
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools}) {
        // start o banco de dados
        const Neo4j = new tools.Neo4j();
        
        // busca os dados da categoria
        const {records: [record]} = await Neo4j.run('MATCH (c:Category {slug: $props.slug}) RETURN c.name AS name', {
            slug : this.data.slug
        });

        // define as informações da categoria
        if(record) {
            this.data.category = {
                name : record.get('name')
            };
        }
        
        return next(this.data);
    }
}
