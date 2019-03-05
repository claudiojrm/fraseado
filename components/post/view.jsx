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
                    post.categories ? (<div className="category-info">
                        <a href={post.categories.link} className="category-name">
                            <figure>
                                <img src="https://fraseado.com.br/wp-content/uploads/2014/11/frases-de-amizade-80x60.jpg" />
                            </figure>
                            <h6>{post.categories.name}</h6>
                        </a>
                    </div>) : null
                }

                <div className="post-content">
                    {
                        post.thumbnail ? (
                            <figure><img src={'/public/' + post.thumbnail} width="100%" alt={post.excerpt} /></figure>
                        ) : null
                    }

                    {
                        post.link ? (
                            <a href={post.link} dangerouslySetInnerHTML={{__html : post.excerpt}} />
                        ) : (
                            <div>
                                <h2 dangerouslySetInnerHTML={{__html : post.title}} />
                                <div dangerouslySetInnerHTML={{__html : post.excerpt}} />
                            </div>
                        )
                    }

                </div>
            </article>
        );
    }
}