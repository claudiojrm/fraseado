/**
 * @class Post
 * @description Classe de Inicialização do componente Post
 */
export default class Post {
    /**
     * @memberof Post
     * @method constructor
     * @returns {Void}
     */
    constructor() {
        this.default = {};
    }

    /**
     * @memberof Post
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} config Dados de configuração do projeto
     * @returns {Function}
     */
    async _dispatch({next, config}) {
        const embedded = this.data._embedded || {};

        this.data.title = this.data.title.rendered;
        this.data.content = this.data.content.rendered;
        this.data.link = this.data.link.replace(config.proxy, '');
        this.data.excerpt = (this.data.content || '').replace(/<[^>]+>/g, '');

        if(embedded['wp:term']) {
            this.data.categories = (({name, link}) => ({
                name : this.data.short ? name.replace(/frases d[aoe] /gi, '') : name,
                link : link.replace(config.proxy, '')}
            ))((((embedded['wp:term'] || [])[0] || [])[0] || []));
        }

        this.data.thumbnail = this.media(embedded['wp:featuredmedia'], 'medium', config.proxy).source;
        this.data.medium = this.media(embedded['wp:featuredmedia'], 'medium', config.proxy).source;

        return next(this.data);
    }

    /**
     * @memberof Post
     * @method media
     * @description Método para tratamento da url de imagem
     * @param {Object} data Dados da imagem
     * @param {String} size Tamanho da imagem
     * @param {String} proxy Path do proxy
     * @returns {Object}
     */
    media(data, size, proxy) {
        return ((data || [])[0] || {}).media_details ? (({source_url, attrs}) => ({
            source : source_url.replace(proxy + '/wp-content/', ''),
            ...attrs
        }))(data[0].media_details.sizes[size]) : '';
    }
}
