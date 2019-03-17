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
        const {records:menus} = await Neo4j.run('MATCH (c:Category)-[:HOME]-(h:Home) RETURN c.name, c.slug UNION MATCH (:Category)<--(c:Category)--(p:Post) WITH COUNT(p) AS total, c WHERE total > 10 AND NOT c.name CONTAINS "2017" AND NOT c.name CONTAINS "2018" RETURN c.name, c.slug ORDER BY total DESC');

        for(const menu of menus) {
            this.data.submenu.push({
                name : menu.get('c.name'),
                href : config.base + menu.get('c.slug')
            });
        }

        next(this.data);
    }
}
