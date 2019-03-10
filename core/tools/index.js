// import de libs do projeto
import StringTool from './string';
import Neo4j from './neo4j';

/**
 * @type {Object}
 * @description Objeto com todas as instâncias de libs do projeto
 */
export const tools = {
    String : new StringTool(),
    Neo4j
};