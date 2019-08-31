/**
 * @type {Function}
 * @description Configurações das rotas do projeto, com base na url executa o componente
 */
window.Loader = (components) => {
    components.forEach(cp => {
        const name =  cp.replace(/-(style-scss|script)\.js/, '');
        const file = ['style.scss', 'script.js'][+cp.includes('script')]

        import(/* webpackChunkName: "[request]", webpackInclude: /(\.s?css|script\.js)$/ */ `../components/${name}/${file}`).then(c => c.default);
    });
};

if('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('/service-worker.js'));
}