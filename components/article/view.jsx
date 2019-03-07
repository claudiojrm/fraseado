import React, { Component } from 'react';
import App from '../app/view';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';

/**
 * @class Article
 * @description Classe de Inicialização da view do componente Article
 */
export default class Article extends Component {
    /**
     * @memberof Article
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <App {...this.props.App}>
                <Loading />
                <Header />
                <Menu />
                <main className="container">
                    <Post post={this.props.post} />
                </main>
            </App>
        );
    }
}