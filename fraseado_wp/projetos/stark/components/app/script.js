import axios from 'axios';

// carrega os ícones do projeto
(async () => {
    const icons = await axios.get('/?name=icons');
    document.body.insertAdjacentHTML('beforeend', icons.data);
})();

// hit audience
window.hitGA = () => {
    document.querySelectorAll('[data-ga]:not(.ga)').forEach(audience => {
        audience.classList.add('ga');
        const [event, action, listener='click'] = audience.getAttribute('data-ga').split('|');
        audience.addEventListener(listener, () => window.ga('send', 'event', event, action));
    });
};

// cliques ga
window.addEventListener('load', window.hitGA);