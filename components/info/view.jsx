import React from 'react';

/**
 * @var Name
 * @description Variável de Inicialização da view do componente Name
 */
const Name = ({link, className, children}) =>
    link ? <a href={link} className={className}>{children}</a> : <div>{children}</div>;

/**
 * @var Info
 * @description Variável de Inicialização da view do componente Info
 */
const Info = ({name, description, image, card, link}) => {
    return (
        <div className={'info ' + (card ? 'card' : '')}>
            <Name link={link} className="name">
                {
                    image ? (
                        <figure>
                            <img src={image} width="80" height="80" />
                        </figure>
                    ) : null
                }

                <h6>{name}</h6>
            </Name>

            <p>{description}</p>
        </div>
    );
};

export default Info;
