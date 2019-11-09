import React, { Component } from 'react';
import classnames from 'classnames';
import './Card.scss';
import CardDetails from '../CardDetails/CardDetails';
import { dateUtils } from './../../utils';

export interface CardProps {
    card: any;
    content: string;
}

export default class Card extends Component<CardProps> {
    public render() {
        const { card, content } = this.props;
        const cardCn = classnames(
            'Card',
            content === 'blogers' && 'Card_width_medium',
            content === 'series' && 'Card_width_small',
        );
        const img = card.onto_poster || card.thumbnail;

        return (
            <a
                className="Card-Link"
                href={`https://yandex.ru/efir?from=efir&stream_id=${card.content_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={cardCn}>
                    <div className="Card-Thumb" style={{ backgroundImage: `url(${img})` }}>
                        <CardDetails card={card} content={content}/>
                    </div>
                    <div className="Card-Content">
                        <div className="Card-Title" >
                            {content === 'blogers' ? card.computed_title : card.includes[0].series.title}
                        </div>
                        <div className="Card-Subtitle">
                            {content === 'blogers' ? dateUtils(card.release_date_ut) : card.genres.toString()}
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}
