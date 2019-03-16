import Category from "../category/controller";

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
            posts : {}
        };
    }

    /**
     * @memberof Home
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados do config
     * @returns {Function}
     */
    async _dispatch({next, config, tools}) {
        // start o banco de dados
        const Neo4j = new tools.Neo4j();

        // busca os dados da categoria
        const {records:categories} = await Neo4j.run('MATCH (:Home)-[h:HOME]-(c:Category)-->(pc:Category) OPTIONAL MATCH (c)-[:ATTACHMENT]-(a:Attachment) RETURN c.id, c.name, a.file, pc.slug + "/" + c.slug AS slug');

        for(const category of categories) {
            // lista de posts para cada categoria
            const {records:posts} = await Neo4j.run('MATCH (c:Category {id:$props.id})--(p:Post), (c)--(s:Category) OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN p.id, p.title, p.content, a.file, s.slug + "/" + c.slug + "/" + p.slug + "/" AS slug LIMIT 4', {
                id : category.get('c.id')
            });

            // posts por categoria
            this.data.posts[category.get('slug')] = {
                posts : [],
                category : {
                    name : category.get('c.name'),
                    link : category.get('slug'),
                    thumbnail : category.get('a.file') ? config.uploads + category.get('a.file').replace(/.jpg$/, '-80x60$&') : ''
                }
            };

            for(const post of posts) {
                await this.update('post', {
                    id : post.get('p.id'),
                    link : post.get('slug'),
                    content : post.get('p.content'),
                    thumbnail : post.get('a.file')
                });

                this.data.posts[category.get('slug')].posts.push(this.data.post);
            }
        }

        // configurações de metatags
        this.update('metatags', {});

        return next(this.data);
    }
}
