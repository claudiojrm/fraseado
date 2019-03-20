import React, { Component } from 'react';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Footer from '../footer/view';

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
            <>
                <Loading />
                <Header />
                <Menu {...this.props.menu} />
                <main className="container">
                    <Post post={this.props.post} />
                </main>
                <Footer />
            </>
        );
    }
}