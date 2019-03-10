import React, { Component } from 'react';

/**
 * @class Post
 * @description Classe de Inicialização da view do componente Post
 */
export default class Post extends Component {
    /**
     * @memberof Post
     * @method render
     * @returns {HTML}
     */
    render() {
        const {post} = this.props;

        return(
            <article className="post">
                {
                    post.category ? (<div className="category-info">
                        <a href={post.category.link} className="category-name">
                            <figure>
                                <img src="https://fraseado.com.br/wp-content/uploads/2014/11/frases-de-amizade-80x60.jpg" />
                            </figure>
                            <h6>{post.category.name}</h6>
                        </a>
                    </div>) : null
                }

                <div className="post-content">
                    {
                        post.thumbnail ? (
                            <figure><img src={'/public/uploads/' + post.thumbnail} width="100%" alt={post.excerpt} /></figure>
                        ) : null
                    }

                    {
                        post.link ? (
                            <a href={post.link}>
                                <div dangerouslySetInnerHTML={{__html : post.excerpt }} />
                                <div className="more">continuar lendo<svg><use xlinkHref="#right" /></svg></div>
                            </a>
                        ) : (
                            <div>
                                <h2 dangerouslySetInnerHTML={{__html : post.title}} />
                                <div dangerouslySetInnerHTML={{__html : post.content}} />
                            </div>
                        )
                    }

                </div>
            </article>
        );
    }
}