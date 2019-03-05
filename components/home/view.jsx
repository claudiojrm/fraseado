import React, { Component } from 'react';
import Page from '../page/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';

/**
 * @class Home
 * @description Classe de Inicialização da view do componente Home
 */
export default class Home extends Component {
    /**
     * @memberof Home
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <Page {...this.props.Page}>
                <Header />
                <Menu />
                <main className="container">
                    {
                        this.props.posts.map((post, idx) => {
                            return(
                                <Post key={idx} post={post} />
                            );
                        })
                    }
                </main>
            </Page>
        );
    }
}