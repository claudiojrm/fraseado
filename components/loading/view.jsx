import React, { Component } from 'react';

/**
 * @class Loading
 * @description Classe de Inicialização da view do componente Loading
 */
export default class Loading extends Component {
    state = {
        loaded : false
    }

    /**
     * @description Altera o estado de exibição do loading ao carregar a página
     * @memberof Loading
     * @method componentDidMount
     */
    componentDidMount() {
        window.addEventListener('load', () =>
            this.setState({
                loaded : true
            })
        );
    }

    /**
     * @memberof Loading
     * @method render
     * @returns {HTML}
     */
    render() {
        return(
            <div className={'loading ' + (this.state.loaded ? 'hide' : '')} />
        );
    }
}