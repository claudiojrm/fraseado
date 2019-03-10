import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../loading/view';
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
     * @method constructor
     * @description Define as props como states
     */
    constructor(props) {
        super(props);
        const {posts, category} = this.props;

        this.loadPosts = this.loadPosts.bind(this);

        this.state = {
            posts,
            category
        };
    }

    /**
     * @memberof Category
     * @method loadPosts
     * @description Carrega os próximos posts da categoria
     * @returns {void}
     */
    loadPosts = async e => {
        e.preventDefault();

        const {data:{data}} = await axios.get(e.target.href + '?json');

        this.setState({
            posts : [...this.state.posts, ...data.posts],
            category : {
                link : data.category.link
            }
        });
    }

    /**
     * @memberof Category
     * @method render
     * @returns {HTML}
     */
    render() {
        const {posts, category} = this.state;

        return (
            <>
                <Loading />
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
                            <Button variant="p1" href={category.link} onClick={this.loadPosts} size="md" block>Carregar mais frases</Button>
                        ) : null
                    }
                </main>
            </>
        );
    }
}