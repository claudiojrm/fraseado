import React from 'react';
import {Icon} from 'react-icons-kit';
import {home} from 'react-icons-kit/ikons/home';
import {magnifying_glass} from 'react-icons-kit/ikons/magnifying_glass';
import {heart} from 'react-icons-kit/ikons/heart';
import {list} from 'react-icons-kit/ikons/list';

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
                        <Icon size={24} icon={home} />
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Buscar">
                        <Icon size={24} icon={magnifying_glass} />
                        <span>Buscar</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Favoritos">
                        <Icon size={24} icon={heart} />
                        <span>Favoritos</span>
                    </a>
                </li>
                <li>
                    <a href="#" title="Menu">
                        <Icon size={24} icon={list} />
                        <span>Menu</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Menu;