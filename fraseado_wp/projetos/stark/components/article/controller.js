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
        // carrega os dados do menu
        await this.update('menu');

        // start o banco de dados
        const Neo4j = new tools.Neo4j();
        const params = this.data.params;

        // busca os dados do post
        const {records:[record]} = await Neo4j.run('MATCH (p:Post {slug:$props.post})--(s:Category)--(c:Category) OPTIONAL MATCH (s)--(ac:Attachment) OPTIONAL MATCH (p)--(a:Attachment) RETURN p.title, p.content, p.excerpt, p.slug, p.id, s.name, s.description, c.slug + "/" + s.slug AS slug, ac.file, a.file ORDER BY s.id LIMIT 1', {
            ...params
        });

        // define as informações do post
        if(record) {
            const link = `${config.base}${record.get('slug')}/${record.get('p.slug')}/`;

            if(record.get('slug') == params.cat + '/' + params.sub) {
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

                // dados do post
                const post = this.data.post;

                // configurações de metatags
                await this.update('metatags', {
                    title : post.category.name + ': ' + post.title,
                    metas : [
                        { name : 'description', content : post.excerpt + ' ' + record.get('s.description') }
                    ],
                    links : [
                        { rel : 'canonical', href : link },
                        { rel : 'amphtml', href : link + '?amp' },
                        { rel: 'image_src', href : config.uploads + record.get('a.file').replace(/.jpg$/, '-1024x768$&'), disabled: !record.get('a.file') }
                    ]
                });
            } else {
                this.data.redirect = [301, link];
            }
        } else {
            this.data.redirect = [301, config.base];
        }

        return next(this.data);
    }
}
