import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Info from '../info/view';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

/**
 * @class Favorite
 * @description Classe de Inicialização da view do componente Favorite
 */
export default class Favorite extends Component {
    state = {
        posts : [],
        init : 0,
        page : 10,
        next : false,
        loading : false
    }

    /**
     * @memberof Favorite
     * @method componentDidMount
     * @description Método para carregar os itens favoritos assim que o componente estiver pronto
     */
    async componentDidMount() {
        await this.loadPosts();
    }

    /**
     * @memberof Favorite
     * @method loadPosts
     * @description Método para listar os itens favoritados
     */
    async loadPosts() {
        if(!this.state.loading) {
            // ids dos itens favoritados
            const favorites = (JSON.parse(localStorage.getItem('favoritos')) || []).reverse();

            if(favorites.length) {
                const ids = JSON.stringify(favorites.slice(this.state.init, this.state.page));

                // states iniciais
                this.setState({
                    favorites : favorites.length,
                    loading : true
                });

                setTimeout(async () => {
                    // itens favoritados
                    const {data:{data}} = await axios.get(`${this.props.config.base}/meus-favoritos/?ids=${ids}&json`);

                    // states
                    const {init, page, posts} = this.state;

                    // define os posts que serão exibidos
                    this.setState({
                        posts : [...posts, ...data.posts],
                        init : page,
                        page : page + (page - init),
                        next : favorites.length > page,
                        loading : false
                    });
                }, 3000)
            }
        }
    }

    /**
     * @memberof Favorite
     * @method render
     * @returns {HTML}
     */
    render() {
        return (
            <>
                <Loading />
                <Header />
                <Menu />
                <main className="container">
                    <Info name="Meus favoritos" description="Aqui você encontra as melhores frases que você encontrou e favoritou!" card="true" />
                    {
                        this.state.posts.length ?
                            this.state.posts.map((post, idx) =>
                                <Post key={idx} post={post} />
                            ) : (
                            <Alert variant="danger">
                                {
                                    this.state.favorites ? 'Estamos carregando seus favoritos...' : 'Você ainda não tem favoritos!'
                                }
                            </Alert>
                        )
                    }

                    {
                        this.state.next ? (
                            <Button className={this.state.loading ? 'disabled' : ''} variant="p1" onClick={() => this.loadPosts()} size="md" block>{this.state.loading ? 'Carregando...' : 'Carregar mais frases'}</Button>
                        ) : null
                    }
                </main>
            </>
        );
    }
}