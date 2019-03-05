/**
 * @class Article
 * @description Classe de Inicialização do componente Article
 */
export default class Article {
    /**
     * @memberof Article
     * @method constructor
     * @param {Object} tools Tools do projeto     
     * @returns {Void}
     */
    constructor({tools}) {
        this.default = {
            params : tools.request.params,
            post : {
                title : 'não tem',
                content : 'não tem mesmo',
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
     * @param {Object} tools Tools do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools}) {
        // start o banco de dados
        const Neo4j = new tools.Neo4j();
        
        // busca os dados da categoria
        const {records:[record]} = await Neo4j.run('MATCH (p:Post {slug:$props.post})-[:CATEGORY {slug:$props.sub}]-()-[:CATEGORY {slug: $props.cat}]->(d) RETURN p.title, p.content LIMIT 1', {
            ...this.data.params
        });

        // define as informações da categoria
        if(record) {
            Object.assign(this.data.post, {
                title : record.get('p.title'),
                content : record.get('p.content')
            });
        }

        return next(this.data);
    }
}
