import fs from 'fs';
import { Parser } from 'xml2js';

/**
 * @class Crawler
 * @description Classe de Inicialização do componente Crawler
 */
export default class Crawler {
    /**
     * @memberof Crawler
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {};
    }

    /**
     * @memberof Crawler
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @returns {Function}
     */
    async _dispatch({next, tools}) {
        const xml = fs.readFileSync(__dirname + '/frases.xml');
        const {crawler} = tools.request.params;
        const {ids} = tools.request.query;

        (new Parser()).parseString(xml, async (err, result) => {
            const Neo4j = new tools.Neo4j();
            const [channel] = result.rss.channel;
            const terms = channel['wp:term'];
            const posts = channel.item;

            if(this[crawler]) {
                if(crawler == 'category') {
                    await this[crawler](Neo4j, terms.filter(term => term['wp:term_taxonomy'].includes(crawler)));
                } else if(crawler == 'featured') {
                    await this[crawler](Neo4j, ids);
                } else {
                    await this[crawler](Neo4j, posts.filter(post => post['wp:post_type'].includes(crawler)));
                }
            } else {
                await this.attachment(Neo4j, posts.filter(post => post['wp:post_type'].includes('attachment')));
                await this.category(Neo4j, terms.filter(term => term['wp:term_taxonomy'].includes('category')));
                await this.post(Neo4j, posts.filter(post => post['wp:post_type'].includes('post')));
                await this.featured(Neo4j, ids);
            }
        });

        // configurações de metatags
        this.update('metatags', {
            metas : [
                { name : 'robots', content : 'noindex, nofollow' }
            ]
        });

        return next(this.data);
    }

    /**
     * @memberof Crawler
     * @method featured
     * @description Método de cadastro de destaques da home
     * @param {Function} Neo4j Tool para o banco de dados
     * @param {String} ids Lista de ids das categorias
     * @returns {void}
     */
    async featured(Neo4j, ids) {
        // verifica se existe algum id
        if(ids) {
            // transforma os ids em numericos
            ids = (ids || '').split(',').map(Number);

            // remove todos os destaques
            await Neo4j.run('MATCH (h:Home)-[i:HOME]-() DELETE h,i');
            await Neo4j.run('CREATE (h:Home {name:"Home"}) RETURN h');

            // cria uma relação (categoria)-[:HOME]-(home)
            for(const id of ids) {
                await Neo4j.run('MATCH (c:Category {id:$props.id}), (h:Home) MERGE (h)<-[:HOME {id:$props.id}]-(c) RETURN h', {
                    id
                });
            }
        }
    }

    /**
     * @memberof Crawler
     * @method category
     * @description Método de cadastro de categoria
     * @param {Function} Neo4j Tool para o banco de dados
     * @param {Object} terms Lista de categorias
     * @returns {void}
     */
    async category(Neo4j, terms) {
        for(const term of terms) {
            let [id] = term['wp:term_id'];
            const [slug] = term['wp:term_slug'];
            const [name] = term['wp:term_name'];
            const [description] = term['wp:term_description'] || [''];
            const [parent] = term['wp:term_parent'] || [];
            const metas = term['wp:termmeta'];
            const extras = {};

            id = parseInt(id);

            let run = 'MERGE (c:Category {id:$props.id, slug: $props.slug, name: $props.name, description: $props.description})';

            if(parent) {
                run = 'MATCH (p:Category {slug: $props.parent}) ' + run + ' MERGE (c)-[:CATEGORY {slug: $props.parent}]->(p)';
            }

            await Neo4j.run(run, {
                id,
                slug,
                name,
                description,
                parent
            });

            if(metas) {
                for(const meta of metas) {
                    let [key] = meta['wp:meta_key'];
                    let [value] = meta['wp:meta_value'];

                    if(key == 'wpfifc_featured_image') {
                        extras.attach = parseInt(value);
                    }
                }

                if(extras.attach) {
                    await Neo4j.run('MATCH (c:Category {id: $props.id}), (a:Attachment {id: $props.attach}) MERGE (c)-[:ATTACHMENT {id: $props.attach}]->(a)', {
                        id,
                        ...extras
                    });
                }
            }
        }
    }

    /**
     * @memberof Crawler
     * @method attachment
     * @description Método de cadastro de imagens
     * @param {Function} Neo4j Tool para o banco de dados
     * @param {Object} posts Lista de posts
     * @returns {void}
     */
    async attachment(Neo4j, posts) {
        for(const post of posts) {
            let [id] = post['wp:post_id'];
            const [slug] = post['wp:post_name'];
            const [title] = post.title;
            const [description] = post.description;
            const metas = post['wp:postmeta'];
            const extras = {};

            id = parseInt(id);

            for(const meta of metas) {
                let [key] = meta['wp:meta_key'];
                let [value] = meta['wp:meta_value'];
                key = key.replace(/_wp_attach(ed|ment)_/, '');

                if(key == 'file' || key == 'metadata') {
                    const sizes = new Set();

                    if(key == 'metadata') {
                        value.replace(/"width"[^\d]+(\d+).*?"height"[^\d]+(\d+)/g, function(a, w, h) {
                            sizes.add(w+'x'+h);
                        });

                        value = [...sizes].sort((a, b) => (parseInt(b.split('x')) - parseInt(a.split('x'))));
                    }

                    extras[key] = value;
                }
            }

            await Neo4j.run('MERGE (p:Attachment {id: $props.id, slug: $props.slug, title: $props.title, description: $props.description, file: $props.file, metadata: $props.metadata})', {
                id,
                slug,
                title,
                description,
                ...extras
            });
        }
    }

    /**
     * @memberof Crawler
     * @method post
     * @description Método de cadastro de posts
     * @param {Function} Neo4j Tool para o banco de dados
     * @param {Object} posts Lista de posts
     * @returns {void}
     */
    async post(Neo4j, posts) {
        for(const post of posts) {
            let [id] = post['wp:post_id'];
            const [slug] = post['wp:post_name'];
            const [title] = post.title;
            const [description] = post.description;
            const [content] = post['content:encoded'];
            const [excerpt] = post['excerpt:encoded'];
            const categories = post['category'];
            const metas = post['wp:postmeta'];
            const extras = {};
            id = parseInt(id);

            await Neo4j.run('MERGE (p:Post {id: $props.id, slug: $props.slug, title: $props.title, description: $props.description, content: $props.content, excerpt: $props.excerpt})', {
                id,
                slug,
                title,
                description,
                content : content.replace(/\n/g, '<br>'),
                excerpt
            });

            for(const category of categories) {
                await Neo4j.run('MATCH (p:Post {id: $props.id}), (c:Category {slug: $props.cat}) MERGE (p)-[:CATEGORY {slug: $props.cat}]->(c)', {
                    cat : category.$.nicename,
                    id
                });
            }

            for(const meta of metas) {
                let [key] = meta['wp:meta_key'];
                let [value] = meta['wp:meta_value'];

                if(key == '_thumbnail_id') {
                    extras.attach = parseInt(value);
                }
            }

            if(extras.attach) {
                await Neo4j.run('MATCH (p:Post {id: $props.id}), (a:Attachment {id: $props.attach}) MERGE (p)-[:ATTACHMENT {id: $props.attach}]->(a)', {
                    id,
                    ...extras
                });
            }
        }
    }
}