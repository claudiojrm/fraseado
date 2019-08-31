import React from 'react';
import { render } from 'react-dom';
import Category from './view';

render(
    <Category {...window.STARKData} />,
    document.querySelector('#App')
);