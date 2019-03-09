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
    key: fs.readFileSync('./keys/localhost.key'),
    cert: fs.readFileSync('./keys/localhost.crt')
}, App).listen(port, () => {
    // configurations express
    Object.entries(
        new Core().express(express.static)
    ).forEach(([prop, value]) => value.forEach(k => {
        return k.value ? App[prop](k.key, k.value) : App[prop](k.key());
    }));

    console.log('Running por: ' + port);
});