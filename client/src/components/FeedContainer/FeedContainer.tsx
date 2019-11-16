import React, { Component } from 'react';
import './FeedContainer.scss';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { State, Dispatch } from '../../store/createStore';
import { setMainFeedThunk } from '../../store/thunks';
import { CardProps } from './../../types/CardProps';
import { ListProps, ListCardProps } from './../../types/ListCardProps';
import { excludeBannedCards } from './../../utils';

interface OwnProps {
    category: string;
}

interface StateProps {
    content: ListCardProps[];
    onInitMainFeed(): void;
}

type FeedContainerProps = OwnProps & StateProps;

const renderList = (list: ListProps) =>
    (
        excludeBannedCards(list.includes).map((card: CardProps) => (
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

const renderCard = (card: CardProps) =>
    (
        card.includes && card.includes[0].banned
            ? null
            : <Card className="Feed-Item" {...card} key={card.content_id} content_type="vod" />
    );

class FeedContainer extends Component<FeedContainerProps> {
    public componentDidMount() {
        const { category, onInitMainFeed } = this.props;

        if (category === 'main') {
            onInitMainFeed();
        }
    }

    public render() {
        return (
            <div className="Feed">
                {
                    this.props.content.map((list: ListCardProps) =>
                        list.content_type_name === 'carousel'
                            ? renderCarousel(list)
                            : renderCard(list))
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    content: state[ownProps.category],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitMainFeed: () => dispatch(setMainFeedThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
