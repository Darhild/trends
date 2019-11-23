import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import Player from '../Player/Player';
import './FeedPlayer.scss';
import mainCarousel from '../../main_page_carousel.json';
import Card from '../Card/Card';

const cardProps = {
    withFooter: false,
    hoverPadding: false,
    className: 'FeedPlayer-Card',
    imgView: 'full',
    size: 'none',
    shadowed: true,
    bold: true,
};

export default class FeedPlayer extends Component {
    public render() {
        const items = [];

        for (let i = 0; i < mainCarousel.length; i += 2) {
            items.push(
                <div className="FeedPlayer-Item">
                    <Card {...cardProps} {...mainCarousel[i]}/>
                    <Card {...cardProps} {...mainCarousel[i + 1]}/>
                </div>,
            );
        }

        return (
            <div className = "FeedPlayer">
                <Player className="FeedPlayer-Player"/>
                <Carousel
                    className="FeedPlayer-Carousel"
                    canBeHidden={false}
                    scrollSize={262}
                    margin="s"
                    arrowPosition="inset"
                >
                    {items}
                </Carousel>
            </div>
        );
    }
}
