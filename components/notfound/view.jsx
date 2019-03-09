import React, { Component } from 'react';
import App from '../app/view';
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
        const Body = () =>
            <>
                <Loading />
                <Header />
                <Menu />
                <main className="container">
                    Nenhum item encontrado: {this.props.title}
                </main>
            </>;

        return (
            this.props.App ? <App {...this.props.App}><Body /></App> : <Body />
        );
    }
}