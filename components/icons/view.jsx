import React from 'react';
import { home, magnifying_glass, heart, list, arrow_right } from 'react-icons-kit/ikons';
import { facebook, whatsapp, twitter, pinterest2, instagram } from 'react-icons-kit/icomoon';

/**
 * @var icons
 * @description Ícones que serão carregados e slug do ícone
 */
const icons = {
    busca : magnifying_glass,
    favorito : heart,
    facebook,
    home,
    instagram,
    menu : list,
    pinterest2,
    right : arrow_right,
    twitter,
    whatsapp
};

/**
 * @var getPath
 * @description Retorna o path do svg
 * @param {String} name Nome da propriedade svg
 * @param {Object} prop Propriedades do svg
 * @returns {String}
 */
const getPath = ({name, children:[prop]}) => name == 'path' || prop.name == 'path' ? prop.attribs.d : getPath(prop);

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