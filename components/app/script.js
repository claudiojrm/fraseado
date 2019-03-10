import axios from 'axios';

// carrega os ícones do projeto
(async () => {
    const icons = await axios.get('/?name=icons');
    document.querySelector('#App').insertAdjacentHTML('beforeend', icons.data);
})();