/**
 * @class Favorite
 * @description Classe de Inicialização do componente Favorite
 */
export default class Favorite {
    /**
     * @memberof Favorite
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {
            props : ['posts'],
            ids : [],
            posts : []
        };
    }

    /**
     * @memberof Favorite
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

        try {
            this.data.ids = JSON.parse(tools.request.query.ids);
        } catch(e) {}

        // busca os dados do post
        if(this.data.ids.length) {
            const {records:posts} = await Neo4j.run('MATCH (p:Post)--(c:Category) WHERE p.id IN $props.ids WITH p, min(c.id) as id MATCH (p)--(c:Category)--(s:Category) WHERE c.id = id OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN DISTINCT s.slug + "/" + c.slug as slug,c.name, p.id, p.content, p.slug, a.file', {
                ids : this.data.ids
            });

            for(const post of posts) {
                this.update('post', {
                    id : post.get('p.id'),
                    content : post.get('p.content'),
                    thumbnail : post.get('a.file'),
                    link : `${config.base}/${post.get('slug')}/${post.get('p.slug')}/`,
                    category : {
                        name : post.get('c.name'),
                        link : `${config.base}/${post.get('slug')}/`
                    }
                });

                this.data.posts.push(this.data.post);
            }
        }

        return next(this.data);
    }
}
