import React from 'react';
import manifest from '../../public/dist/bundle/manifest.json';
// import fs from 'fs';
{/* <style key={idx}>
    {
        fs.readFileSync(path.resolve(data.config.bundle, manifest[file].replace(data.config.dist, '')), 'utf-8')
    }
</style> */}


/**
 * @var getFiles
 * @description Método responsável por retornar os arquivos que serão carregados via webpack
 */
const getFiles = ({notfound}, name, file) => {
    return Object.keys(manifest).filter(cp => [notfound ? 'notfound' : name, 'app'].includes(cp.split(new RegExp(`-(${file})`, 'g'))[0]));
};

/**
 * @class App
 * @description Classe de Inicialização da view do componente App
 */
const App = ({query, children, data, name, metatags:{title, base, metas, links}}) => {
    /**
     * @memberof App
     * @method render
     * @returns {HTML}
     */
    return ('name' in query || 'json' in query) ? children : <>
        <html lang="pt-br">
            <head>
                {
                    title ? (
                        <>
                            <title>{title}</title>
                            <base href={base} />
                            {metas.map(({disabled, override, ...meta}, idx) => !disabled ? <meta {...meta} key={idx} /> : null)}
                            {
                                getFiles(data, name, 'style-scss.css').map(file => {
                                    links.push({ rel : 'stylesheet', href : manifest[file] });
                                })
                            }
                            {links.map(({disabled, override, ...link}, idx) => !disabled ? <link {...link} key={idx} /> : null)}
                        </>
                    ) : null
                }
            </head>
            <body>
                <div id="App">{children}</div>
                <script src={manifest['main.js']}></script>
                <script dangerouslySetInnerHTML={{__html : `window.Loader(${JSON.stringify(getFiles(data, name, 'script'))});`}} />
                <script dangerouslySetInnerHTML={{__html : `window.STARKData = ${JSON.stringify(data)};`}} />
                {
                    data.config.ga ? (
                        <script dangerouslySetInnerHTML={{__html : `
                        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){ (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,'script','//www.google-analytics.com/analytics.js','ga');window.ga('create', '${data.config.ga}', 'auto');window.ga('send', 'pageview');`}}>
                        </script>
                    ) : null
                }
            </body>
        </html>
    </>;
};

export default App;