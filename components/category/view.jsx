import React, { Component } from 'react';
import Page from '../page/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Button from 'react-bootstrap/Button';

/**
 * @class Category
 * @description Classe de Inicialização da view do componente Category
 */
export default class Category extends Component {
    /**
     * @memberof Category
     * @method render
     * @returns {HTML}
     */
    render() {
        const {posts, category} = this.props;

        return (
            <Page {...this.props.Page}>
                <Header />
                <Menu />
                <main className="container">
                    <div className="category-info category-card">
                        <div className="category-name">
                            <figure>
                                <img src="https://fraseado.com.br/wp-content/uploads/2014/11/frases-de-amizade-80x60.jpg" />
                            </figure>
                            <h6>{category.name}</h6>
                        </div>

                        <p>{category.description}</p>
                    </div>
                    {
                        posts.map((post, idx) => {
                            return(
                                <Post key={idx} post={post} />
                            );
                        })
                    }

                    {
                        category.link ? (
                            <Button variant="p1" href={category.link + 'page/1'} size="md" block>Carregar mais frases</Button>
                        ) : null
                    }
                </main>
            </Page>
        );
    }
}