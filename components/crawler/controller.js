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
        
        (new Parser()).parseString(xml, async (err, result) => {
            const [channel] = result.rss.channel;
            const terms = channel['wp:term'];
            const posts = channel.item;
            
            // start o banco de dados
            const Neo4j = new tools.Neo4j();
            
            // for(const term of terms) {
            //     const [id] = term['wp:term_id'];
            //     const [slug] = term['wp:term_slug'];
            //     const [name] = term['wp:term_name'];
            //     const [description] = term['wp:term_description'] || [''];
            //     const [tax] = term['wp:term_taxonomy'];
            //     const [parent] = term['wp:term_parent'] || [];
                
            //     if(tax == 'category') {
            //         let run = 'MERGE (c:Category {id:$props.id, slug: $props.slug, name: $props.name, description: $props.description})';

            //         if(parent) {
            //             run = 'MATCH (p:Category {slug: $props.parent}) ' + run + ' MERGE (c)-[:CATEGORY {slug: $props.parent}]->(p)';
            //         }

            //         await Neo4j.run(run, {
            //             id,
            //             slug,
            //             name,
            //             description,
            //             parent
            //         });
            //     }

            //     break;
            // }
            
            for(const post of posts) {
                const [type] = post['wp:post_type'];

                if(type == 'post') {
                    const [id] = post['wp:post_id'];
                    const [slug] = post['wp:post_name'];
                    const [title] = post.title;
                    const [description] = post.description;
                    const [content] = post['content:encoded'];
                    const [excerpt] = post['excerpt:encoded'];
                    const categories = post['category'];

                    await Neo4j.run('MERGE (p:Post {id: $props.id, slug: $props.slug, title: $props.title, description: $props.description, content: $props.content, excerpt: $props.excerpt})', {
                        id,
                        slug,
                        title,
                        description,
                        content,
                        excerpt
                    });

                    for(const category of categories) {
                        await Neo4j.run('MATCH (p:Post {id: $props.id}), (c:Category {slug: $props.cat}) MERGE (p)-[:CATEGORY {slug: $props.cat}]->(c)', {
                            cat : category.$.nicename,
                            id
                        });
                    }
                }
            }
        });
        
        return next(this.data);
    }
}
