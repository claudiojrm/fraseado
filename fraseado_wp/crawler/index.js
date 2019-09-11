const axios = require('axios');
const fs = require('fs');
const slugify = require('slugify');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use('/imagens', express.static(__dirname + '/imagens'));

app.get(/generate\/([a-z0-9]+)\/([A-Za-z0-9\/_\-]+)/, async function(req, res) {
    const name = req.params[0];
    const uri = req.params[1];
    const url = 'http://localhost:3000' + req.originalUrl.replace('generate/', '');
    let error = false;
    let data = [];

    try {
        const browser = await puppeteer.launch({defaultViewport:null});
        const page = await browser.newPage();

        await page.goto(url, {
            waitUntil: 'load'
        });
        
        const frases = await page.$$eval('.frases li', frases => 
            frases.map(frase => ({
                titulo : frase.querySelector('h1') && frase.querySelector('h1').innerText,
                autor : frase.querySelector('p') && frase.querySelector('p').innerText
            }))
        );

        for(let i = 0; i < frases.length; i++) {
            const frase = frases[i];

            const slug = (frase.autor && slugify(frase.autor, {
                lower : true
            }) || uri.split('/')[0]).replace(/_/g, '-');

            frase.titulo = frase.titulo.substr(0, 50);
            frase.titulo = frase.titulo.substr(0, Math.min(frase.titulo.length, frase.titulo.lastIndexOf(' ')));

            const titulo = slugify(frase.titulo, {
                lower: true
            });

            const dir = './imagens/' + name;
            await !fs.existsSync(dir) && fs.mkdirSync(dir);
            await !fs.existsSync(dir + '/' + slug) && fs.mkdirSync(dir + '/' + slug);
    
            const filepath = `${dir}/${slug}/${slug + '-'}${titulo}.jpg`;

            await page.evaluateHandle('document.fonts.ready');
            await page.screenshot({
                path: filepath,
                type : 'jpeg',
                quality : 80,
                clip : {
                    x: 0,
                    y : 768 * i,
                    width: 1024,
                    height: 768
                }
            });

            data.push({
                color: '',
                imagem: '/' + filepath
            });
        }

        await browser.close();
    } catch(e) {
        error = e.toString();
    }

    res.render('index', { 
        title: 'Crawler: ' + url,
        data,
        error
    });
});

app.get(/([a-z0-9]+)\/([A-Za-z0-9\/_\-]+)/, async function(req, res) {
    const sites = {
        mundodasmensagens : {
            url : 'https://www.mundodasmensagens.com/',
            card : '.box',
            frase : 'p',
            autor : /\s{3,}(.*?)$/
        },
        mensagens10 : {
            url : 'https://www.mensagens10.com.br/',
            card : '.card,.content',
            frase : 'p',
            autor : /\((.*?)\)$/
        },
        pensador : {
            url : 'https://www.pensador.com/',
            card : '.thought-card,.pensaFrase',
            frase : '.frase,.fr',
            autor : '.autor'
        },
        mensagenscomamor : {
            url : 'https://www.mensagenscomamor.com/',
            card : '.quote-page',
            frase : 'p',
            autor : '.quote-author'
        },
        biblia : {
            url : 'https://www.bibliaonline.com.br/',
            card : '.jss161',
            frase : '.jss161',
            autor : /(^\d+)\s?/,
            subtitle : 'Salmos ' + req.params[1].replace(/.*?(\d+)$/, '$1:')
        },
        kdfrases : {
            url : 'https://kdfrases.com/',
            card : '.quote',
            frase : '.qlink',
            autor : '.qauthor a'
        }
    };

    const alias = sites[req.params[0]];
    const uri = req.params[1];
    const url = alias.url + uri;
    let error = false;
    let data = [];
    
    try {
        const {data:dt} = await axios.get(url);
        const $ = cheerio.load(dt);
        const frases = $(alias.card);
        const colors = ['bg1', 'bg2', 'bg3'];

        for (let i = 0; i < frases.length; i++) {
            const card = $(frases[i]);
            let frase = alias.card == alias.frase ? card : card.find(alias.frase);
            let text = frase.text().trim().replace(/[!]+/g, '!').replace(/\s+([,\.])/g, '$1').replace(/\n/g, '. ').replace(/;/g, ',').replace(', e', ' e').replace('. .', '.').replace('que. a', 'que a');
            let subtitle = alias.subtitle || '';

            if(typeof alias.autor == 'object') {
                subtitle += ((text.match(alias.autor) || [])[1] || '');
                text = text.replace(alias.autor, '');
            } else {
                subtitle += card.find(alias.autor).text().trim();
            }

            if(text == text.toUpperCase()) {
                text = text.toLowerCase();
            }

            text = text.slice(0, 1).toUpperCase() + text.slice(1);

            if(subtitle.toLowerCase().includes('frase') || subtitle.toLowerCase().includes('desconhecido')) {
                subtitle = '';
            }
            
            let color = ((data.length + 1) % colors.length);

            if(!isNaN(parseInt(req.query.bg))) {
                color = req.query.bg - 1;
            }

            data.push({
                text,
                autor : subtitle,
                color : colors[color],
                classe : req.query.classe
            });
        }
    } catch(e) {
        error = e;
    }

    if(!data.length) {
        error = 'Nenhuma frase encontrada';
    }

    res.render('index', { 
        title: 'Crawler: ' + url,
        data,
        error
    });
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
