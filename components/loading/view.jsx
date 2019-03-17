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
        const loading = {
            alignItems: 'center',
            background: '#D33569 url(/public/logo.png) no-repeat center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            position: 'fixed',
            top: 0,
            transition: 'opacity .7s, width .7s .7s, height .7s .7s',
            width: '100%',
            zIndex: 3
        };

        return(
            <div className={'loading ' + (this.state.loaded ? 'hide' : '')} style={loading} />
        );
    }
}