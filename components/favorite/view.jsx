import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../loading/view';
import Header from '../header/view';
import Menu from '../menu/view';
import Post from '../post/view';
import Info from '../info/view';

/**
 * @class Favorite
 * @description Classe de Inicialização da view do componente Favorite
 */
export default class Favorite extends Component {
    state = {
        posts : this.props.posts,
        loading : true
    }

    /**
     * @memberof Favorite
     * @method componentDidMount
     * @description Método para listar os itens favoritados
     */
    async componentDidMount() {
        // ids dos itens favoritados
        const ids = localStorage.getItem('favoritos');

        // itens favoritados
        const {data:{data}} = await axios.get(`${this.props.config.base}/meus-favoritos/?ids=${ids}&json`);

        // define os posts que serão exibidos
        this.setState({
            posts : data.posts
        });
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
                        this.state.posts.map((post, idx) => {
                            return(
                                <Post key={idx} post={post} />
                            );
                        })
                    }
                </main>
            </>
        );
    }
}