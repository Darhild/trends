import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import { TParam } from './../../pages/Main';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import Carousel from '../Carousel/Carousel';
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

class Categories extends Component<RouteComponentProps<TParam>> {
    public state = {
        activeCategory: this.props.match.params.category,
    };

    public componentDidUpdate() {
        if (this.props.match.params.category !== this.state.activeCategory) {
            this.setState({
                activeCategory: this.props.match.params.category,
            });
        }
    }

    public render() {
        return (
            <div className="Categories">
                <Carousel canBeHidden={false}>
                {
                    categories.map(({ name, value }) => {
                        const itemCn = classnames(
                            'Categories-Item',
                            value === this.state.activeCategory && 'Categories-Item_state_active',
                        );

                        return(
                            <Link to={value}>
                                <div className={itemCn}>
                                    {name}
                                </div>
                            </Link>
                        );
                    })
                }
                </Carousel>

            </div>
        );
    }
}

export default Categories;
