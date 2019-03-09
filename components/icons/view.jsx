import React from 'react';
import {Icon} from 'react-icons-kit';
import {home} from 'react-icons-kit/ikons/home';
import {magnifying_glass} from 'react-icons-kit/ikons/magnifying_glass';
import {heart} from 'react-icons-kit/ikons/heart';
import {list} from 'react-icons-kit/ikons/list';

/**
 * @var Icons
 * @description Variável de Inicialização da view do componente Icons
 */
const Icons = () => {
    return (
        <>
            <Icon size={24} icon={home} />
            <Icon size={24} icon={magnifying_glass} />
            <Icon size={24} icon={heart} />
            <Icon size={24} icon={list} />
        </>
    );
};

export default Icons;