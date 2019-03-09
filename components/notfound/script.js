import React from 'react';
import { hydrate } from 'react-dom';
import NotFound from './view';

hydrate(
    <NotFound {...window.STARKData} />,
    document.querySelector('#App')
);