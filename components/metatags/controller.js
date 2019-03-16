/**
 * @class Metatags
 * @description Classe de Inicialização do componente Metatags
 */
export default class Metatags {
    /**
     * @memberof Metatags
     * @method constructor
     * @param {Object} config Dados do config
     * @returns {Void}
     */
    constructor({config}) {
        this.default = {
            title : 'Frases e mensagens de amor, motivação e reflexão para você compartilhar',
            base : config.base,
            metas : [
                { name : 'robots', content : 'index, follow, noodp', override : true },
                { name : 'description', content : 'Frases de amor, amizade, aniversário e datas especiais. Compartilhe imagens, poemas de importantes autores e mensagens de amor, mensagens de motivação e muito mais.', override : true },
                { 'httpEquiv' : 'X-UA-Compatible', content : 'IE=edge,chrome=1' },
                { name : 'charset', content : 'utf-8' },
                { name : 'viewport', content : 'width=device-width' },
                { name : 'p:domain_verify', content : 'b8b2ea0a33ab565ed7b88aecd81382f7' },
                { name : 'msvalidate.01', content : '8D41387FFE3302C6A706E8DFFE063290' },
                { name : 'fb:pages', content : '296924883845956' },
                { name : 'fb:pages', content : '299527070076503' },
            ],
            links : [
                { rel : 'dns-prefetch', href : 'https://pagead2.googlesyndication.com' },
                { rel : 'dns-prefetch', href : 'https://www.google-analytics.com' },
                { rel : 'shortcut icon', href : config.pub + 'favicon.ico' },
                { rel : 'image_src', href : config.pub + 'logo-share.png', override : true }
            ]
        };
    }

    /**
     * @memberof Metatags
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @returns {Function}
     */
    async _dispatch({next}) {
        this.data.title += ' | Fraseado, frases e mensagens para compartilhar';
        next(this.data);
    }
}
