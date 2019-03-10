import React from 'react';
import { home, magnifying_glass, heart, list } from 'react-icons-kit/ikons';

/**
 * @var icons
 * @description Ícones que serão carregados e slug do ícone
 */
const icons = {
    'busca' : magnifying_glass,
    'favorito' : heart,
    'home' : home,
    'menu' : list
};

/**
 * @var getPath
 * @description Retorna o path do svg
 * @param {String} name Nome da propriedade svg
 * @param {Object} prop Propriedades do svg
 * @returns {String}
 */
const getPath = ({name, children:[prop]}) => name == 'path' ? prop.attribs.d : getPath(prop);

/**
 * @var Icons
 * @description Variável de Inicialização da view do componente Icons
 */
const Icons = () => {
    return (
        <svg className="icons">
            {
                Object.entries(icons).map(([name, svg]) => (
                    <symbol key={name} id={name} viewBox={svg.viewBox}>
                        <path d={getPath(svg)}></path>
                    </symbol>
                ))
            }
        </svg>
    );
};

export default Icons;