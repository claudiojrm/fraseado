import React from 'react';

/**
 * @class App
 * @description Classe de Inicialização da view do componente App
 */
const App = (props) => {
    /**
     * @memberof App
     * @method render
     * @returns {HTML}
     */
    return <>
        <html>
            <head>
                <meta name="charset" content="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <title>Título</title>
            </head>
            <body>
                <div id="App">{props.children}</div>
                <script src={props.main}></script>
                <script dangerouslySetInnerHTML={{__html : `window.Loader(${props.components});`}} />
                <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${props.STARKData};`}} />
            </body>
        </html>
    </>;
};

export default App;