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
            cat : tools.request.params.cat,
            sub : tools.request.params.sub,
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
        const {records: [record]} = await Neo4j.run('MATCH (c:Category {slug: $props.sub})-[:CATEGORY {slug: $props.cat}]->() RETURN c.name AS name, c.description AS description', {
            cat : this.data.cat,
            sub : this.data.sub
        });

        // define as informações da categoria
        if(record) {
            this.data.category = {
                name : record.get('name'),
                description : record.get('description')
            };
        }
        
        return next(this.data);
    }
}
