import React, { Component } from 'react';
import classnames from 'classnames';
import './Card.scss';
import CardDetails from './CardDetails/CardDetails';
import { dateUtils } from './../../utils';

export interface CardProps {
    card: any;
    content_type?: string;
}

export default class Card extends Component<CardProps> {
    public render() {
        const { card, content_type } = this.props;
        const cardCn = classnames(
            'Card',
            content_type === 'blogger' && 'Card_width_medium',
            content_type === 'series' && 'Card_width_small',
        );
        const img = card.onto_poster || card.thumbnail;

        return (
            <a className="Card-Link" href={`https://yandex.ru/efir?from=efir&stream_id=${card.content_id}`} target="_blank">
                <div className={cardCn}>
                    <div className="Card-Thumb" style={{ backgroundImage: `url(${img})` }}>
                        <CardDetails card={card} content_type={content_type}/>
                    </div>
                    <div className="Card-Content">
                        <div className="Card-Title" >
                            {content_type === 'blogger' ? card.computed_title : card.title}
                        </div>
                        <div className="Card-Subtitle">
                            {content_type === 'blogger' ? dateUtils(card.release_date_ut) : ''}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}
