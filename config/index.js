/**
 * @type {Object}
 * @description Objeto com as configurações do projeto e de cada componente
 */
const base = 'https://localhost:3002/';
const pub = base + 'public/';
const uploads = pub + 'uploads/';

export default {
    base,
    pub,
    uploads,
    ga : 'UA-55713936-1',
    dist : 'public/dist/bundle'
};