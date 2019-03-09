import React from 'react';

/**
 * @var Menu
 * @description Variável de Inicialização da view do componente Menu
 */
const Menu = () => {
    return (
        <nav className="navigation">
            <ul>
                <li>
                    <a href="/" title="Home">
                        <svg><use xlinkHref="#home" /></svg>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Buscar">
                        <svg><use xlinkHref="#busca" /></svg>
                        <span>Buscar</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Favoritos">
                        <svg><use xlinkHref="#favorito" /></svg>
                        <span>Favoritos</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Menu">
                        <svg><use xlinkHref="#menu" /></svg>
                        <span>Menu</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;
