import React, { Component } from 'react';
import Share from '../share/view';
import Info from '../info/view';

/**
 * @class Post
 * @description Classe de Inicialização da view do componente Post
 */
export default class Post extends Component {
    state = {
        ids : []
    }

    /**
     * @memberof Post
     * @method favorite
     * @description Método para favoritar um post
     */
    favorite = e => {
        e.preventDefault();

        // id favoritado
        const id = this.props.post.id;

        // flag que indica se está favoritado
        const favorite = this.state.ids.includes(id);

        // ids de itens favoritados
        let ids = JSON.parse(localStorage.getItem('favoritos')) || [];
        ids = favorite ? ids.filter(i => i != id) : [...ids, id];

        // adiciona o id no storage
        localStorage.setItem('favoritos', JSON.stringify(ids));

        // atualiza o state com os ids favoritados
        this.setState({
            ids
        });
    }

    /**
     * @memberof Post
     * @method componentDidMount
     * @description Método para atualizar os ids favoritados
     */
    componentDidMount() {
        // atualiza o state com os ids favoritados
        this.setState({
            ids : JSON.parse(localStorage.getItem('favoritos')) || []
        });
    }

    /**
     * @memberof Post
     * @method render
     * @returns {HTML}
     */
    render() {
        const {post} = this.props;
        const isFavorite = this.state.ids.includes(post.id);

        return(
            <article className="post">
                <Share {...post} isFavorite={isFavorite} favorite={this.favorite} noflap={!post.category && post.thumbnail} />
                <Info {...post.category} />

                <div className="post-content">
                    {
                        post.thumbnail ? (
                            <figure onDoubleClick={this.favorite}><img src={post.thumbnail} width="100%" alt={post.excerpt} /></figure>
                        ) : null
                    }

                    {
                        post.link ? (
                            <a href={post.link}>
                                <p dangerouslySetInnerHTML={{__html : post.excerpt }} />
                                <div className="more">continuar lendo<svg><use xlinkHref="#right" /></svg></div>
                            </a>
                        ) : (
                            <div>
                                <h1 dangerouslySetInnerHTML={{__html : post.title}} />
                                <p dangerouslySetInnerHTML={{__html : post.content}} />
                            </div>
                        )
                    }
                </div>
            </article>
        );
    }
}