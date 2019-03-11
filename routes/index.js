/**
 * @type {Object}
 * @description Configurações das rotas do projeto, com base na url executa o componente
 */
export const routes = {
    '/' : 'home',
    '/:cat/:sub' : 'category',
    '/:cat/:sub/page/:page' : 'category',
    '/:cat/:sub/:post' : 'article',
    '/meus-favoritos' : 'favorite',
    '/crawler' : 'crawler',
    '*' : 'notfound'
};