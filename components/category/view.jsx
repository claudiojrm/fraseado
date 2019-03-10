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
            category,
            loading : false
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

        // botão
        const btn = e.target;

        // identifica se o botão já não foi clicado
        if(!this.state.loading) {
            // link da próxima página
            const link = btn.href;

            // flag para indicar que está carregando mais contéudo
            this.setState({
                loading : true
            });

            // request com os dados da próxima página
            const {data:{data}} = await axios.get(link + '?json');

            // altera a url de navegação
            history.pushState(null, null, link);

            // atualiza os dados dos posts e link da categoria
            this.setState({
                loading : false,
                posts : [...this.state.posts, ...data.posts],
                category : {
                    link : data.category.link
                }
            });
        }
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
                            <Button className={this.state.loading ? 'disabled' : ''} variant="p1" href={category.link} onClick={this.loadPosts} size="md" block>{this.state.loading ? 'Carregando...' : 'Carregar mais frases'}</Button>
                        ) : null
                    }
                </main>
            </>
        );
    }
}