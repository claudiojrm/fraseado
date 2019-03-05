import Home from '../components/home/view';
import Category from '../components/category/view';
import Article from '../components/article/view';

/**
 * @type {Object}
 * @description Configurações das rotas do projeto, com base na url executa o componente
 */
export const routes = {
    '/' : {
        name : 'home',
        Component : Home
    },
    '/:cat/:sub' : {
        name : 'category',
        Component : Category
    },
    '/:cat/:sub/:post' : {
        name : 'article',
        Component : Article
    }
};