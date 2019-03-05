import React from 'react';
import { hydrate } from 'react-dom';
import Category from './view';

hydrate(
    <Category {...window.STARKData} Page={{loadJS:true}} />,
    document.querySelector('#App')
);