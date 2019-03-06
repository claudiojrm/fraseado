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
                category : {
                    name : 'não tem categoria'
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
        const params = this.data.params;

        // busca os dados do post
        const {records:[record]} = await Neo4j.run('MATCH (p:Post {slug:$props.post})-[]-(s:Category)-[]-(c:Category) RETURN p.title, p.content, s.slug, s.name, c.slug ORDER BY s.id LIMIT 1', {
            ...params
        });

        // define as informações do post
        if(record && (record.get('c.slug') == params.cat && record.get('s.slug') == params.sub)) {
            Object.assign(this.data.post, {
                title : record.get('p.title'),
                content : record.get('p.content'),
                category : {
                    name : record.get('s.name'),
                    link : ['', ...Object.values(params).slice(0, -1), ''].join('/')
                }
            });
        }

        return next(this.data);
    }
}
