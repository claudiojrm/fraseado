import React from 'react';
import manifest from '../../public/dist/bundle/manifest.json';


/**
 * @var getFiles
 * @description Método responsável por retornar os arquivos que serão carregados via webpack
 */
const getFiles = ({notfound}, name) =>
    Object.keys(manifest).filter(cp => [notfound ? 'notfound' : name, 'app'].includes(cp.split(/-(script|style)/)[0]));

/**
 * @class App
 * @description Classe de Inicialização da view do componente App
 */
const App = ({query, children, data, name}) => {
    /**
     * @memberof App
     * @method render
     * @returns {HTML}
     */
    return ('name' in query || 'json' in query) ? children : <>
        <html>
            <head>
                <meta name="charset" content="utf-8" />
                <meta name="viewport" content="width=device-width" />
                <title>Título</title>
            </head>
            <body>
                <div id="App">{children}</div>
                <script src={manifest['main.js']}></script>
                <script dangerouslySetInnerHTML={{__html : `window.Loader(${JSON.stringify(getFiles(data, name))});`}} />
                <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${JSON.stringify(data)};`}} />
            </body>
        </html>
    </>;
};

export default App;