import React from 'react';
import { hydrate } from 'react-dom';
import Article from './view';

hydrate(
    <Article {...window.STARKData} />,
    document.querySelector('#App')
);