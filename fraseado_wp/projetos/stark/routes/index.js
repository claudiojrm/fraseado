/**
 * @type {Object}
 * @description Configurações das rotas do projeto, com base na url executa o componente
 */
export const routes = {
    '/' : 'home',
    '/crawler(/:crawler)?' : 'crawler',
    '/meus-favoritos' : 'favorite',
    '/:cat/:sub' : 'category',
    '/:cat/:sub/page/:page' : 'category',
    '/:cat/:sub/:post' : 'article',
    '*' : 'notfound'
};