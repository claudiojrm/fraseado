import React from 'react';
import manifest from '../../public/dist/bundle/manifest.json';


/**
 * @var getFiles
 * @description Método responsável por retornar os arquivos que serão carregados via webpack
 */
const getFiles = ({notfound, name}) =>
    Object.keys(manifest).filter(cp => [notfound ? 'notfound' : name, 'app'].includes(cp.split(/-(script|style)/)[0]));

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
    return ('name' in props.query || 'json' in props.query) ? props.children : <>
        <html>
            <head>
                <meta name="charset" content="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <title>Título</title>
            </head>
            <body>
                <div id="App">{props.children}</div>
                <script src={manifest['main.js']}></script>
                <script dangerouslySetInnerHTML={{__html : `window.Loader(${JSON.stringify(getFiles(props))});`}} />
                <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${JSON.stringify(props.data)};`}} />
            </body>
        </html>
    </>;
};

export default App;