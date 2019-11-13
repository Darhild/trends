import React, { Component } from 'react';
import classnames from 'classnames';
import './Card.scss';
import CardContent from './CardContent/CardContent';
import CardThumb from './CardThumb/CardThumb';
import { CardProps } from './../../types/CardProps';

export default class Card extends Component<CardProps> {
    public render() {
        const content_type = this.props.content_type;
        const cardCn = classnames(
            'Card',
            content_type === 'vod' && 'Card_width_full Feed-Item',
            content_type === 'blogger' && 'Card_width_medium',
            (content_type === 'series' || content_type === 'movie') && 'Card_width_small',
        );

        return (
            <a
                className="Card-Link"
                href={`https://yandex.ru/efir?from=efir&stream_id=${this.props.content_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={cardCn}>
                    <CardThumb  {...this.props} content_type={content_type}/>
                    <CardContent {...this.props} content_type={content_type}/>
                </div>
            </a>
        );
    }
}
