import React, { Component } from 'react';
import axios from 'axios';
import NotFound from '../notfound/view';

/**
 * @class App
 * @description Classe de Inicialização da view do componente App
 */
export default class App extends Component {
    /**
     * @memberof App
     * @method componentDidMount
     * @description executa após o render do componente
     */
    async componentDidMount() {
        // carrega os ícones do projeto
        const icons = await axios.get('/?name=icons');
        document.querySelector('#App').insertAdjacentHTML('beforeend', icons.data);
    }

    /**
     * @memberof App
     * @method render
     * @returns {HTML}
     */
    render() {
        const Body = () =>
            this.props.notfound ? <NotFound {...this.props.notfound} /> : this.props.children;

        return this.props.main ? (
            <html>
                <head>
                    <meta name="charset" content="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <title>Título</title>
                </head>
                <body>
                    <div id="App">
                        <Body />
                    </div>
                    <script src={this.props.main}></script>
                    <script dangerouslySetInnerHTML={{__html : `window.Loader(${this.props.components});`}} />
                    <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${this.props.STARKData};`}} />
                </body>
            </html>
        ) : <Body />;
    }
}