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
            props : ['category', 'posts'],
            params : tools.request.params,
            limit : 10,
            category : {},
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
        if(record && (record.get('pc.slug') == params.cat && record.get('c.slug') == params.sub)) {
            // paginação do post
            const {limit} = this.data;
            const page = params.page || 1;
            const skip = (page - 1) * limit;

            // query para o total de posts
            let {records:[total]} = await Neo4j.run('MATCH b=(c:Category {slug:$props.sub})-[]-(p:Post) RETURN COUNT(p) as total', {
                ...params
            });

            // número total de posts
            total = total.get('total').low;

            // lista de posts
            const {records:posts} = await Neo4j.run('MATCH b=(c:Category {slug:$props.sub})-[]-(p:Post) OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN p.content, p.slug, p.id, a.file SKIP $props.skip LIMIT $props.limit', {
                ...params,
                skip,
                page,
                limit
            });

            // limite total de posts
            if(total > skip) {
                // configuração da categoria
                Object.assign(this.data.category, {
                    name : record.get('c.name'),
                    description : record.get('c.description'),
                    link : total > skip + limit ? (`/${params.cat}/${params.sub}/page/${+page + 1}/`) : ''
                });

                for(const post of posts) {
                    this.update('post', {
                        id : post.get('p.id'),
                        link : `/${params.cat}/${params.sub}/${post.get('p.slug')}/`,
                        content : post.get('p.content'),
                        thumbnail : post.get('a.file') || ''
                    });

                    this.data.posts.push(this.data.post);
                }
            } else {
                this.update('notfound', {
                    title : '404 categoria - página'
                });
            }
        } else {
            this.update('notfound', {
                title : '404 categoria'
            });
        }

        return next(this.data);
    }
}
