import React from 'react';

/**
 * @var Share
 * @description Variável de Inicialização da view do componente Share
 */
const Share = ({noshadow}) => {
    return (
        <div className={'share ' + (!noshadow ? 'hasshadow' : '')}>
            <a href="#" className="wts">
                <svg><use xlinkHref="#whatsapp" /></svg>
            </a>
            <a href="#" className="fb">
                <svg><use xlinkHref="#facebook" /></svg>
            </a>
            <a href="#" className="pin">
                <svg><use xlinkHref="#pinterest2" /></svg>
            </a>
            <a href="#" className="tw">
                <svg><use xlinkHref="#twitter" /></svg>
            </a>
            <a href="#" className="fav">
                <svg><use xlinkHref="#favorito" /></svg>
            </a>
        </div>
    );
};

export default Share;