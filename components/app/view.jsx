import React, { Component } from 'react';

/**
 * @class App
 * @description Classe de Inicialização da view do componente App
 */
export default class App extends Component {
    /**
     * @memberof App
     * @method render
     * @returns {HTML}
     */
    render() {
        return this.props.main ? (
            <html>
                <head>
                    <meta name="charset" content="utf-8" />
                    <meta name="viewport" content="width=device-width" />
                    <title>Título</title>
                </head>
                <body>
                    <div id="App">{this.props.children}</div>
                    <script src={this.props.main}></script>
                    <script dangerouslySetInnerHTML={{__html : `window.Loader(${this.props.components});`}} />
                    <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${this.props.STARKData};`}} />
                </body>
            </html>
        ) : this.props.children;
    }
}