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
                category : {}
            }
        };
    }

    /**
     * @memberof Article
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
        const params = this.data.params;

        // busca os dados do post
        const {records:[record]} = await Neo4j.run('MATCH (p:Post {slug:$props.post})-[]-(s:Category)-[]-(c:Category) OPTIONAL MATCH (s)--(ac:Attachment) OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN p.title, p.content, p.id, s.name, c.slug + "/" + s.slug AS slug, ac.file, a.file ORDER BY s.id LIMIT 1', {
            ...params
        });

        // define as informações do post
        if(record && (record.get('slug') == params.cat + '/' + params.sub)) {
            await this.update('post', {
                id : record.get('p.id'),
                thumbnail : record.get('a.file'),
                title : record.get('p.title'),
                content : record.get('p.content'),
                category : {
                    name : record.get('s.name'),
                    link : `${config.base}${record.get('slug')}/`,
                    thumbnail : record.get('ac.file') ? config.uploads + record.get('ac.file').replace(/.jpg$/, '-80x60$&') : ''
                }
            });

            // configurações de metatags
            await this.update('metatags', {});
        } else {
            this.data.redirect = [301, config.base];
        }

        return next(this.data);
    }
}
