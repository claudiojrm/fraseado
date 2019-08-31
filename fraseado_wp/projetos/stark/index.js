// node modules import
import express from 'express';
import spdy from 'spdy';
import fs from 'fs';

// core project
import Core from './core/index';

// express start
const App = express();

// porta da aplicação
const port = 3002;

// create server
export default spdy.createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/fraseado.com.br/privkey.pem', 'utf-8'),
    cert: fs.readFileSync('/etc/letsencrypt/live/fraseado.com.br/cert.pem', 'utf-8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/fraseado.com.br/chain.pem', 'utf-8')
}, App).listen(port, 'fraseado.com.br', () => {
    // configurations express
    Object.entries(
        new Core().express(express.static)
    ).forEach(([prop, value]) => value.forEach(k => {
        return k.value ? App[prop](k.key, k.value) : App[prop](k.key());
    }));

    console.log('Running por: ' + port);
});