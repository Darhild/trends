import React from 'react';
import { NavLink } from 'react-router-dom';
import Scroller from '../Scroller/Scroller';
import './Categories.scss';

interface Category {
    name: string;
    value: string;
    url?: string;
}

const categories: Category[] = [
    {
        name: 'Что посмотреть',
        value: 'main',
    },
    {
        name: 'Фильмы',
        value: 'movie',
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
        value: 'blogger',
    },
    {
        name: 'Спорт',
        value: 'sport',
        url: 'https://yandex.ru/efir?stream_channel=1550142789&stream_active=category&stream_category=sport',
    },
    {
        name: 'Музыка',
        value: 'music',
        url: 'https://yandex.ru/efir?stream_channel=1550142789&stream_active=category&stream_category=music',
    },
    {
        name: 'Игры и Киберспорт',
        value: 'games',
        url: 'https://yandex.ru/efir?stream_channel=1550142789&stream_active=category&stream_category=cybersport',
    },
];

const Categories: React.FC = () =>
    (
        <div className="Categories">
            <Scroller>
            {
                categories.map(({ name, value, url }) => {
                    if (url) {
                        return (
                            <a
                                className="Categories-Item"
                                key={value}
                                href={url}
                            >
                                {name}
                            </a>
                        );
                    }

                    return (
                        <NavLink
                            to={'/' + value}
                            key={value}
                            className="Categories-Item"
                            activeClassName="Categories-Item_state_active"
                        >
                            {name}
                        </NavLink>
                    );
                })
            }
            </Scroller>
        </div>
    );

export default Categories;
