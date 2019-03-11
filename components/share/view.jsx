import React from 'react';

/**
 * @var Share
 * @description Variável de Inicialização da view do componente Share
 */
const Share = ({isFavorite, favorite, noshadow}) => {
    return (
        <div className={'share ' + (!noshadow ? 'hasshadow' : '')}>
            <a href="#" className="wts">
                <span>Compartilhar no Whatsapp</span>
                <svg><use xlinkHref="#whatsapp" /></svg>
            </a>
            <a href="#" className="fb">
                <span>Compartilhar no Facebook</span>
                <svg><use xlinkHref="#facebook" /></svg>
            </a>
            <a href="#" className="pin">
                <span>Compartilhar no Pinterest</span>
                <svg><use xlinkHref="#pinterest2" /></svg>
            </a>
            <a href="#" className="tw">
                <span>Compartilhar no Twitter</span>
                <svg><use xlinkHref="#twitter" /></svg>
            </a>
            <a href="#" className={'fav ' + (isFavorite ? 'active' : '')} onClick={favorite}>
                <span>Favoritar conteúdo</span>
                <svg><use xlinkHref="#favorito" /></svg>
            </a>
        </div>
    );
};

export default Share;