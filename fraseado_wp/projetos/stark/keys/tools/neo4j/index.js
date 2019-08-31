import { v1 as neo4j } from 'neo4j-driver';

/**
 * @class Neo4j
 * @description Classe que conecta ao banco de dados do neo4j
 */
export default class Neo4j {
    /**
     * @memberof Neo4
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        const driver = this.connect();
        this.session = driver.session();
    }

    /**
     * @memberof Neo4
     * @method connect
     * @description Método que conecta ao banco de dados
     * @param {String} host Host do db
     * @param {String} user User do db
     * @param {String} pass Pass do db
     * @returns {Object}
     */
    connect(host = 'bolt://localhost', user = 'neo4j', pass = 'mudar123') {
        return neo4j.driver(host, neo4j.auth.basic(user, pass));
    }

    /**
     * @memberof Neo4
     * @method run
     * @description Método responsável por disparar os comandos do Neo4j
     * @param {Function} Neo4j Tool que interage com o db
     * @param {String} run Comandos Neo4j
     * @param {Object} props Propriedades para execução dos comandos
     * @returns {await}
     */
    async run(run, props) {
        try {
            return await this.session.run(run, {props});
        } catch(e) {
            console.log('Não foi possível realizar a ação:', run, props);
        }
    }
}