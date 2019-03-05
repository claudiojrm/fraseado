import React, { Component } from 'react';
import App from '../app/view';

/**
 * @class Crawler
 * @description Classe de Inicialização da view do componente Crawler
 */
export default class Crawler extends Component {
    /**
     * @memberof Crawler
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <App {...this.props.App}>
                <main className="container">
                    Crawler...
                </main>
            </App>
        );
    }
}