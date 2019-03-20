import React from 'react';

/**
 * @var Footer
 * @description Variável de Inicialização da view do componente Footer
 */
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>2014-{(new Date()).getFullYear()} © Fraseado</p>
                <ul>
                    <li><a href="/termos-de-uso" data-ga="footer|termos">Termos de uso</a> -</li>
                    <li><a href="mailto:fraseado.oficial@gmail.com" data-ga="footer|contato">Contato</a></li>
                </ul>
                <ul className="social">
                    <li><a className="fb" data-ga="social|facebook" href="https://facebook.com/fraseado.oficial/" target="_blank" rel="noopener noreferrer"><svg><use xlinkHref="#facebook" /></svg></a></li>
                    <li><a className="ins" data-ga="social|instagram" href="https://instagram.com/fraseado.oficial/" target="_blank" rel="noopener noreferrer"><svg><use xlinkHref="#instagram" /></svg></a></li>
                    <li><a className="pin" data-ga="social|pinterest" href="https://br.pinterest.com/fraseado/" target="_blank" rel="noopener noreferrer"><svg><use xlinkHref="#pinterest2" /></svg></a></li>
                    <li><a className="tw" data-ga="social|twitter" href="https://twitter.com/fraseado_" target="_blank" rel="noopener noreferrer"><svg><use xlinkHref="#twitter" /></svg></a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;