import React, { Component } from 'react';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';

/**
 * @class NotFound
 * @description Classe de Inicialização da view do componente NotFound
 */
export default class NotFound extends Component {
    /**
     * @memberof NotFound
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <>
                <Loading />
                <Header />
                <Menu />
                <main className="container">
                    Nenhum item encontrado: {this.props.title}
                </main>
            </>
        );
    }
}