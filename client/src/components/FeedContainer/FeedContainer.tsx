import React, { Component } from 'react';
import './FeedContainer.scss';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { State, Dispatch } from '../../store/createStore';
import { setFeedThunk } from '../../store/thunks';
import { FeedItem, Vod, Carousel as CarouselType } from '../../types/FeedItem';
import { excludeBannedCards } from './../../utils';
import Likes from '../Likes/Likes';
import { getCardContent } from '../../utils/feed';

interface OwnProps {
    category: string;
}

interface StateProps {
    content: FeedItem[];
    onInitFeed(tag: string): void;
}

type FeedContainerProps = OwnProps & StateProps;

const renderList = (list: CarouselType) => {
    const filteredCards =  excludeBannedCards(list.includes);

    return filteredCards.map((vod: Vod) => {
        const {
            content_id,
        } = vod;

        return (
            <Card
                key={content_id}
                id={content_id}
                {...getCardContent(vod)}
            />
        );
    });
};

const renderCarousel = (list: CarouselType) =>
    (
        <>
            {!!excludeBannedCards(list.includes).length
            && <Carousel
                title={list.title}
                margin="s"
                carouselId={list.carousel_id}
                key={list.carousel_id}
            >
                {renderList(list)}
            </Carousel>}
        </>
    );

const renderCard = (vod: Vod) =>
    (
        vod.includes && vod.includes[0].banned
            ? null
            : <div className="Feed-Item">
                <Card
                    key={vod.content_id}
                    id={vod.content_id}
                    {...getCardContent(vod)}
                    poster={vod.onto_poster}
                    size="full"
                    rightContent={<Likes />}
                />
            </div>
    );

class FeedContainer extends Component<FeedContainerProps> {
    public componentDidMount() {
        const { category, onInitFeed } = this.props;
        onInitFeed(category);
    }

    public componentDidUpdate(prevProps: FeedContainerProps) {
        const { category, onInitFeed } = this.props;
        if (category !== prevProps.category) {
            onInitFeed(category);
        }
    }

    public render() {
        return (
            <div className="Feed">
                {
                    this.props.content.map((item: FeedItem) =>
                    item.content_type_name === 'carousel'
                        ? renderCarousel(item)
                        : renderCard(item))
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
    content: state[ownProps.category],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitFeed: (tag: string) => dispatch(setFeedThunk(tag)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
