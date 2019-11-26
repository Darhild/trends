import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import Player from '../Player/Player';
import './FeedPlayer.scss';
import mainCarousel from '../../main_page_carousel.json';
import Card from '../Card/Card';

const cardProps = {
    withFooter: false,
    className: 'FeedPlayer-Card',
    imgView: 'full',
    size: 'none',
    shadowed: true,
    bold: true,
};

export default class FeedPlayer extends Component {
    public render() {

        return (
            <div className = "FeedPlayer">
                <Player className="FeedPlayer-Player"/>
                <Carousel
                    className="FeedPlayer-Carousel"
                    itemClass="FeedPlayer-Item"
                    canBeHidden={false}
                    scrollSize={262}
                    rows={2}
                    margin="s"
                    isHoverable={false}
                    arrowPosition="inset"
                >
                    {
                        mainCarousel.map((props) => (
                            <Card key={props.content_id} {...cardProps} {...props}/>
                        ))
                    }
                </Carousel>
            </div>
        );
    }
}
