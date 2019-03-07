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
            params : tools.request.params,
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
        const {params} = this.data;

        // busca os dados da categoria
        const {records: [record]} = await Neo4j.run('MATCH a=(c:Category {slug: $props.sub})-[]-(pc:Category) RETURN c.slug, c.name, c.description, pc.slug', {
            ...params
        });

        // define as informações da categoria
        if(record && (record.get('c.slug') == params.sub && record.get('pc.slug') == params.cat)) {
            Object.assign(this.data.category, {
                name : record.get('c.name'),
                description : record.get('c.description')
            });

            // lista de posts
            const {records:posts} = await Neo4j.run('MATCH b=(c:Category {slug:$props.sub})-[]-(p:Post) OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN p.content, p.slug, a.file', {
                ...params
            });

            for(const post of posts) {
                this.data.posts.push({
                    link : ['', ...Object.values(params), post.get('p.slug'), ''].join('/'),
                    content : post.get('p.content'),
                    thumbnail : (post.get('a.file') || '').replace(/.jpg$/, '-300x225$&')
                });
            }
        }

        return next(this.data);
    }
}
