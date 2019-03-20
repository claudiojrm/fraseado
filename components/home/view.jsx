import React, { Component } from 'react';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Info from '../info/view';
import Footer from '../footer/view';

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
            <>
                <Loading />
                <Header />
                <Menu {...this.props.menu} />
                <main className="container">
                    {
                        Object.values(this.props.posts).map(({posts, category}, idx) =>
                            <section key={idx}>
                                <Info {...category} separator="true" card="true" />
                                {
                                    posts.map((post, idy) =>
                                        <Post post={post} key={idy} />
                                    )
                                }
                            </section>
                        )
                    }
                </main>
                <Footer />
            </>
        );
    }
}