import React from 'react';
import { hydrate } from 'react-dom';
import Home from './view';

hydrate(
    <Home {...window.STARKData} />,
    document.querySelector('#App')
);