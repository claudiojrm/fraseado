import React, { Component } from 'react';

/**
 * @class Share
 * @description Classe de Inicialização da view do componente Share
 */
export default class Share extends Component {
    state = {
        ids : []
    }

    /**
     * @memberof Share
     * @method favorite
     * @description Método para favoritar um post
     */
    favorite = e => {
        e.preventDefault();

        // id favoritado
        const id = this.props.id;

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
     * @memberof Share
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
     * @memberof Share
     * @method render
     * @returns {HTML}
     */
    render() {
        const {noshadow, id} = this.props;

        return (
            <div className={'share ' + (!noshadow ? 'hasshadow' : '')}>
                <a href="#" className="wts">
                    <span>Compartilhar no Whatsapp</span>
                    <svg><use xlinkHref="#whatsapp" /></svg>
                </a>
                <a href="#" className="fb">
                    <span>Compartilhar no Facebook</span>
                    <svg><use xlinkHref="#facebook" /></svg>
                </a>
                <a href="#" className="pin">
                    <span>Compartilhar no Pinterest</span>
                    <svg><use xlinkHref="#pinterest2" /></svg>
                </a>
                <a href="#" className="tw">
                    <span>Compartilhar no Twitter</span>
                    <svg><use xlinkHref="#twitter" /></svg>
                </a>
                <a href="#" className={'fav ' + (this.state.ids.includes(id) ? 'active' : '')} onClick={this.favorite}>
                    <span>Favoritar conteúdo</span>
                    <svg><use xlinkHref="#favorito" /></svg>
                </a>
            </div>
        );
    }
}