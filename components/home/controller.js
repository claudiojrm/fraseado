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
            posts : []
        };
    }

    /**
     * @memberof Home
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
        const {records} = await Neo4j.run('MATCH (c:Category)-[p]->() RETURN c.name, c.slug, p.slug');

        for(const record of records) {
            this.data.posts.push({
                category : {
                    name : record.get('c.name'),
                    link : record.get('p.slug') + '/' + record.get('c.slug')
                }
            });
        }

        // configurações de metatags
        this.update('metatags', {});

        return next(this.data);
    }
}
