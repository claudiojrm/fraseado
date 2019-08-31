import React from 'react';
import { render } from 'react-dom';
import Favorite from './view';

render(
    <Favorite {...window.STARKData} />,
    document.querySelector('#App')
);