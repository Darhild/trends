import React, { Component } from 'react';
import './FeedContainer.scss';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';
import { CardProps } from './../../types/CardProps';
import { ListProps, ListCardProps } from '../../types/ListCardProps';
import { excludeBanned } from './../../utils';

interface OwnProps {
    category: string;
}

interface StateProps {
    content: ListCardProps[];
}

type FeedContainerProps = OwnProps & StateProps;

const renderList = (list: ListProps) =>
    (
        list.includes.map((card: CardProps) => (
            <Card content_type={card.supertag || 'series'} key={card.content_id} {...card}/>
        ))
    );

const renderCarousel = (list: ListProps) =>
    (
        <Carousel
            title={list.title}
            margin="s"
            carouselId={list.carousel_id}
            key={list.carousel_id}
        >
        {renderList(list)}
        </Carousel>
    );

class FeedContainer extends Component<FeedContainerProps> {
    public render() {
        return (
            <div className="Feed">
                {
                    this.props.content.map((list: ListCardProps[]) =>
                        list.content_type_name === 'carousel'
                            ? renderCarousel(excludeBanned(list))
                            : <Card {...list} key={list.content_id} content_type="vod" />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  content: state[ownProps.category],
});

export default connect(mapStateToProps)(FeedContainer);
