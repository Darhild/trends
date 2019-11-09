import React, { Component } from 'react';
import classnames from 'classnames';
import Scroller from '../Scroller/Scroller';
import './Categories.scss';


const categories = ['Что посмотреть', 'Фильмы', 'Сериалы', 'Мультфильмы', 'Блогеры', 'Спорт', 'Музыка', 'Игры'];

class Categories extends Component {
    public state = {
        activeCategory: 0,
    };

    public render() {
        return (
            <div className="Categories">
                <Scroller>
                {
                    categories.map((item, index) => {
                        const itemCn = classnames(
                            'Categories-Item',
                            index === this.state.activeCategory && 'Categories-Item_state_active',
                        );

                        return(
                            <div className={itemCn}>
                                {item}
                            </div>
                        );
                    })
                }
                </Scroller>
            </div>
        );
    }
}

export default Categories;
