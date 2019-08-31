/**
 * @class Category
 * @description Classe de Inicialização do componente Category
 */
export default class Category {
    /**
     * @memberof Category
     * @method constructor
     * @param {Object} tools Tools do projeto
     * @returns {Void}
     */
    constructor({tools}) {
        this.default = {
            params : tools.request.params,
            limit : 10,
            category : {},
            posts : []
        };
    }

    /**
     * @memberof Category
     * @method _dispatch
     * @description Método para tratamento de dados do componente, antes da renderização da view
     * @param {Function} next Callback dispatch
     * @param {Object} tools Tools do projeto
     * @param {Object} config Dados do config
     * @returns {Function}
     */
    async _dispatch({next, config, tools}) {
        // carrega os dados do menu
        await this.update('menu');

        // start o banco de dados
        const Neo4j = new tools.Neo4j();
        const {params} = this.data;

        // busca os dados da categoria
        const {records: [record]} = await Neo4j.run('MATCH (c:Category {slug: $props.sub})--(p:Post) WITH COUNT(p) AS total MATCH (c:Category {slug: $props.sub})--(pc:Category) OPTIONAL MATCH (c)-[:ATTACHMENT]-(a:Attachment) RETURN c.name, c.description, a.file, pc.slug + "/" + c.slug AS slug, total', {
            ...params
        });

        // define as informações da categoria
        if(record && (record.get('slug') == params.cat + '/' + params.sub)) {
            // paginação do post
            const {limit} = this.data;
            const page = params.page || 1;
            const skip = (page - 1) * limit;

            // número total de posts
            const total = record.get('total').low;

            // limite total de posts
            if(total > skip) {
                // lista de posts
                const {records:posts} = await Neo4j.run('MATCH (c:Category {slug:$props.sub})--(p:Post) OPTIONAL MATCH (p)-[:ATTACHMENT]-(a:Attachment) RETURN p.content, p.slug, p.id, a.file SKIP $props.skip LIMIT $props.limit', {
                    ...params,
                    skip,
                    page,
                    limit
                });

                // link da categoria
                const link = `${config.base}${params.cat}/${params.sub}/` + (params.page ? `page/${page}/` : '');
                const next = (total > skip + limit) ? link.replace(/page\/\d+?\/$/, '') + `page/${+page+1}/` : '';

                // configuração da categoria
                Object.assign(this.data.category, {
                    name : record.get('c.name'),
                    description : record.get('c.description'),
                    thumbnail : record.get('a.file') ? config.uploads + record.get('a.file').replace(/.jpg$/, '-80x60$&') : '',
                    link : next,
                    stat : {
                        total,
                        offset : page,
                        page : Math.ceil(total / limit)
                    }
                });

                // configurações dos posts
                for(const post of posts) {
                    await this.update('post', {
                        id : post.get('p.id'),
                        link : `${params.cat}/${params.sub}/${post.get('p.slug')}/`,
                        content : post.get('p.content'),
                        thumbnail : post.get('a.file')
                    });

                    // lista de posts
                    this.data.posts.push(this.data.post);
                }

                // configurações de metatags
                await this.update('metatags', {
                    title : this.data.category.name + (params.page ? ` - Página ${page}` : ''),
                    links : [
                        { rel : 'canonical', href : link },
                        { rel : 'amphtml', href : link + '?amp' },
                        { rel : 'next', href : next, disabled : !next },
                        { rel: 'image_src', href : config.uploads + record.get('a.file').replace(/.jpg$/, '-1024x768$&'), disabled: !record.get('a.file') }
                    ],
                    metas : [
                        { name : 'description', content : this.data.category.description }
                    ]
                });
            }
        }

        // nenhum item para a categoria
        if(!this.data.posts.length) {
            this.data.redirect = [301, config.base];
        }

        return next(this.data);
    }
}
