import React from 'react';
import { NavLink } from 'react-router-dom';
import Scroller from '../Scroller/Scroller';
import './Categories.scss';

const categories = [
    {
        name: 'Что посмотреть',
        value: 'main',
    },
    {
        name: 'Фильмы',
        value: 'film',
    },
    {
        name: 'Сериалы',
        value: 'series',
    },
    {
        name: 'Мультфильмы',
        value: 'kids',
    },
    {
        name: 'Блогеры',
        value: 'blogers',
    },
    {
        name: 'Спорт',
        value: 'sport',
    },
    {
        name: 'Музыка',
        value: 'music',
    },
    {
        name: 'Игры',
        value: 'games',
    },
];

const Categories: React.FC = () =>
    (
        <div className="Categories">
            <Scroller>
            {
                categories.map(({ name, value }) =>
                    (
                        <NavLink
                            to={'/' + value}
                            key={value}
                            className="Categories-Item"
                            activeClassName="Categories-Item_state_active"
                        >
                            {name}
                        </NavLink>
                    ))
            }
            </Scroller>
        </div>
    );

export default Categories;
