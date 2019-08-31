/**
 * @type {Object}
 * @description Objeto com as configurações do projeto e de cada componente
 */
const base = 'https://fraseado.com.br:3002/';
const pub = base + 'public/';

export default {
    ga : 'UA-55713936-1',
    base,
    pub,
    uploads : pub + 'uploads/',
    dist : pub + 'dist/bundle/',
    bundle : 'public/dist/bundle'
};