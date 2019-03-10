import React from 'react';
import { render } from 'react-dom';
import Article from './view';

render(
    <Article {...window.STARKData} />,
    document.querySelector('#App')
);