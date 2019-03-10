import React from 'react';
import { render } from 'react-dom';
import NotFound from './view';

render(
    <NotFound {...window.STARKData} />,
    document.querySelector('#App')
);