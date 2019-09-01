const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const express = require('express');
const app = express();
app.set('view engine', 'pug');
app.use('/imagens', express.static(__dirname + '/imagens'));


app.get('/pensador/(:autor)/(:num)?', async function(req, res) {
    const {autor, num} = req.params;
    const url = 'https://www.pensador.com/autor/' + autor;
    const {data:dt} = await axios.get(url)
    const $ = cheerio.load(dt);
    const frases = $('.thought-card');
    let data = [];
    const colors = ['bg1', 'bg2'];

    for (let i = 0; i < frases.length; i++) {
        const card = $(frases[i]);
        const text = card.find('.frase').text().trim();

        if(text.length > 100) {
            continue;
        }

        data.push({
            text,
            color : colors[(i + 1) % colors.length],
            autor : card.find('.autor').text().trim()
        });
    }


    if(num) {
        data = [data[num]];
    }

    res.render('index', { 
        title: 'Crawler: ' + url,
        data
    });
});


app.get('/pensador/generate/(:autor)/(:num)?', async function(req, res) {
    const {autor, num} = req.params;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.setViewport({width: 1024, height: 768});

    await page.goto('http://localhost:3000/pensador/' + autor, {
        waitUntil: 'networkidle2'
    });
   
    await page.evaluateHandle('document.fonts.ready');
     
    await page.screenshot({
        path: 'imagens/pensador/fraseado.png'
    });

    await browser.close();

    res.send('Imagem gerada com sucesso!');
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
