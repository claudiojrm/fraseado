import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Info from '../info/view';
import Button from 'react-bootstrap/Button';

/**
 * @class Category
 * @description Classe de Inicialização da view do componente Category
 */
export default class Category extends Component {
    state = {
        posts : this.props.posts,
        category : this.props.category,
        loading : false
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
                category : data.category
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
        const info = (({link, ...rest}) => rest)(category);

        return (
            <>
                <Loading />
                <Header />
                <Menu {...this.props.menu} />
                <main className="container">
                    <section>
                        <Info {...info} card="true" />

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
                    </section>
                </main>
            </>
        );
    }
}