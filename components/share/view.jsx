import React from 'react';

/**
 * @var Share
 * @description Variável de Inicialização da view do componente Share
 */
const Share = ({link, excerpt, thumbnail, isFavorite, favorite, noshadow}) => {
    return (
        <div className={'share ' + (!noshadow ? 'hasshadow' : '')}>
            <a href={`whatsapp://send?text=${excerpt} ${link}%3Futm_source%3Dwhatsapp%26utm_medium%3Dreferral%26utm_campaign%3Dshare`} className="wts" target="_blank" rel="noopener noreferrer">
                <span>Compartilhar no Whatsapp</span>
                <svg><use xlinkHref="#whatsapp" /></svg>
            </a>
            <a href={`https://facebook.com/sharer/sharer.php?u=${link}%3Futm_source%3Dfacebook%26utm_medium%3Dreferral%26utm_campaign%3Dshare`} className="fb" target="_blank" rel="noopener noreferrer">
                <span>Compartilhar no Facebook</span>
                <svg><use xlinkHref="#facebook" /></svg>
            </a>
            {
                thumbnail ? (<a href={`https://br.pinterest.com/pin/create/button/?url=${link}%3Futm_source%3Dpinterest%26utm_medium%3Dreferral%26utm_campaign%3Dshare&description=${excerpt}&media=${thumbnail}`} className="pin" target="_blank" rel="noopener noreferrer">
                    <span>Compartilhar no Pinterest</span>
                    <svg><use xlinkHref="#pinterest2" /></svg>
                </a>) : null
            }
            <a href={`https://twitter.com/intent/tweet?text=${excerpt}&url=${link}%3Futm_source%3Dtwitter%26utm_medium%3Dreferral%26utm_campaign%3Dshare&via=fraseado_`} className="tw" target="_blank" rel="noopener noreferrer">
                <span>Compartilhar no Twitter</span>
                <svg><use xlinkHref="#twitter" /></svg>
            </a>
            <a href="#" className={'fav ' + (isFavorite ? 'active' : '')} onClick={favorite} target="_blank" rel="noopener noreferrer">
                <span>Favoritar conteúdo</span>
                <svg><use xlinkHref="#favorito" /></svg>
            </a>
        </div>
    );
};

export default Share;