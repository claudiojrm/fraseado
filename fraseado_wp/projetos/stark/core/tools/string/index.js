/**
 * @class StringTool
 * @description Classe que contêm tratamentos de string
 */
export default class StringTool {
    /**
     * @memberof StringTool
     * @method stripTags
     * @description Método que remove as tags da string
     * @params {String} str Texto
     * @returns {String}
     */
    stripTags(str) {
        return str.replace(/<[^>]+>/g, '');
    }

    /**
     * @memberof StringTool
     * @method limitWords
     * @description Método que limita a quantidade de caracteres
     * @params {String} str Texto
     * @params {Number} limit Quantidade de palavras
     * @params {String} end Concatena uma string no fim das palavras
     * @returns {String}
     */
    limitWords(str, limit = 20, end = '...') {
        const words = str.split(' ');
        const cut = words.slice(0, limit);

        return cut.join(' ') + (words.length > cut.length ? end : '');
    }
}