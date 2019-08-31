/**
 * @class Menu
 * @description Classe de Inicialização do componente Menu
 */
export default class Menu {
    /**
     * @memberof Menu
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {
            propsJson : [],
            submenu : []
        };
    }

    /**
     * @memberof Menu
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @returns {Function}
     */
    async _dispatch({next, config, tools}) {
        // start o banco de dados
        const Neo4j = new tools.Neo4j();

        // busca os dados da categoria
        const {records:menus} = await Neo4j.run('MATCH (:Home)-[h:HOME]-(c:Category)-->(s:Category) RETURN c.name, s.slug + "/" + c.slug AS slug UNION MATCH (s:Category)<--(c:Category)--(p:Post) WITH COUNT(p) AS total, c, s WHERE total > 16 AND NOT c.name CONTAINS "201" AND  s.slug CONTAINS "frases" RETURN c.name, s.slug + "/" + c.slug AS slug ORDER BY total DESC');

        for(const menu of menus) {
            this.data.submenu.push({
                name : menu.get('c.name'),
                href : config.base + menu.get('slug') + '/'
            });
        }

        next(this.data);
    }
}
