import axios from 'axios';

// carrega os ícones do projeto
(async () => {
    const icons = await axios.get('/?name=icons');
    document.body.insertAdjacentHTML('beforeend', icons.data);
})();

// cliques ga
window.addEventListener('load', () => {
    document.querySelectorAll('a[data-ga]').forEach(link => {
        link.addEventListener('click', function() {
            const [event, action] = this.getAttribute('data-ga').split('|');
            window.ga('send', 'event', event, action || 'click');
        });
    });
});