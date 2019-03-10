import React from 'react';
import { render } from 'react-dom';
import Home from './view';

render(
    <Home {...window.STARKData} />,
    document.querySelector('#App')
);