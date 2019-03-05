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
            
            // start o banco de dados
            const Neo4j = new tools.Neo4j();
            
            for(const term of terms) {
                const [[id], [slug], [name], [tax]] = [
                    term['wp:term_id'], 
                    term['wp:term_slug'], 
                    term['wp:term_name'],
                    term['wp:term_taxonomy']
                ];
                
                if(tax == 'category') {
                    console.log(id, slug, name, JSON.stringify(term, null, 4));
                    
                    await Neo4j.run('MERGE (c:Category {id:$props.id, slug: $props.slug, name: $props.name})', {
                        id,
                        slug,
                        name
                    });
                }
            }
        });
        
        return next(this.data);
    }
}
