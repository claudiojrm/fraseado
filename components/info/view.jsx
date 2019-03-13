import React from 'react';

/**
 * @var Name
 * @description Variável de Inicialização da view do componente Name
 */
const Name = ({link, className, children}) =>
    link ? <a href={link} className={className}>{children}</a> : <div className={className}>{children}</div>;

/**
 * @var Info
 * @description Variável de Inicialização da view do componente Info
 */
const Info = ({name, description, image, card, link, stat}) => {
    return (
        <div className={'info ' + (card ? 'info-card' : '')}>
            {
                name ? (
                    <Name link={link} className="info-wrapper">
                        {
                            image ? (
                                <figure>
                                    <img src={image} width="80" height="80" />
                                </figure>
                            ) : null
                        }

                        {
                            card ? (
                                <h2 className="info-name">{name}</h2>
                            ) : (
                                <h6 className="info-name">{name}</h6>
                            )
                        }
                    </Name>
                ) : null
            }

            {
                description ? (
                    <p>{description}</p>
                ) : null
            }

            {
                stat ? (
                    <div className="info-stat">
                        <span>Frases <b>{stat.total}</b></span>
                        <span>Página <b>{stat.offset}/{stat.page}</b></span>
                    </div>
                ) : null
            }
        </div>
    );
};

export default Info;
