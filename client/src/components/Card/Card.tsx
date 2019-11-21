import React, { Component } from 'react';
import classnames from 'classnames';
import './Card.scss';
import CardContent from './CardContent/CardContent';
import CardThumb from './CardThumb/CardThumb';
import { CardProps } from './../../types/CardProps';

export default class Card extends Component<CardProps> {
    public render() {
        const content_type = this.props.content_type;
        const cardLinkCn = classnames(
            'Card-Link',
            this.props.className,
        );
        const cardCn = classnames(
            'Card',
            this.props.className,
            content_type === 'vod' && 'Card_width_full',
            (content_type === 'blogger' || content_type === 'music') && 'Card_width_medium',
            content_type === 'trend' && ['Card_width_full', 'Card_type_trend'],
            content_type === 'promo' && ['Card_width_big', 'Card_type_trend'],
            (content_type === 'series'
                || content_type === 'movie'
                || content_type === 'kids'
                || content_type === 'subscription') && 'Card_width_small',
        );

        return (
            <a
                className={cardLinkCn}
                href={`https://yandex.ru/efir?from=efir&stream_id=${this.props.content_id}`}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={cardCn}>
                    <CardThumb  {...this.props} content_type={content_type} />
                    <CardContent {...this.props} content_type={content_type} />
                </div>
            </a>
        );
    }
}
