import React, { Component } from 'react';

export default class Page extends Component {
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