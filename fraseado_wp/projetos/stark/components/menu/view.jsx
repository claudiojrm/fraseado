import React, { Component } from 'react';

/**
 * @class Menu
 * @description Classe de Inicialização da view do componente Menu
 */
export default class Menu extends Component {
    state = {
        submenu : false
    }

    /**
     * @memberof Menu
     * @description Interações do menu
     * @method menu
     */
    menu = e => {
        e.preventDefault();
        this.setState({
            submenu : !this.state.submenu
        });
    }

    /**
     * @memberof Menu
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <>
                <nav className="navigation">
                    <div className="menu">
                        <ul>
                            <li>
                                <a href="/" title="Home" data-ga="menu|home">
                                    <svg><use xlinkHref="#home" /></svg>
                                    <span>Home</span>
                                </a>
                            </li>
                            <li>
                                <a href="/meus-favoritos/" title="Favoritos" data-ga="menu|favorito">
                                    <svg><use xlinkHref="#favorito" /></svg>
                                    <span>Favoritos</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className={(this.state.submenu ? 'active' : '')} title="Menu" onClick={this.menu} data-ga="menu|abrir-menu">
                                    <svg><use xlinkHref="#menu" /></svg>
                                    <span>Menu</span>
                                </a>
                                {
                                    (this.props.submenu || []).length ? (
                                        <ul className="submenu">
                                            {
                                                this.props.submenu.map(({name, href}, idx) =>
                                                    <li key={idx}><a href={href} data-ga={'submenu|' + href.split('/').slice(-2)[0]}>{name}</a></li>
                                                )
                                            }
                                        </ul>
                                    ) : null
                                }
                            </li>
                        </ul>
                    </div>
                </nav>

                {
                    this.state.submenu ? (
                        <div className="layer" onClick={this.menu}></div>
                    ) : null
                }
            </>
        );
    }
};