import React, { Component } from 'react';

/**
 * @var Menu
 * @description Variável de Inicialização da view do componente Menu
 */
export default class Menu extends Component {
    /**
     * @memberof Menu
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <nav className="navigation">
                <ul>
                    <li>
                        <a href="/" title="Home">
                            <span>Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Buscar">
                            <span>Buscar</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Favoritos">
                            <span>Favoritos</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" title="Menu">
                            <span>Menu</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
