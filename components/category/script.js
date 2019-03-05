import React from 'react';
import { hydrate } from 'react-dom';
import Category from './view';

hydrate(
    <Category {...window.STARKData} />,
    document.querySelector('#App')
);