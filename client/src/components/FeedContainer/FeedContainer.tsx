import React, { Component } from 'react';
import './FeedContainer.scss';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import EmptyCards from './../EmptyCards/EmptyCards';
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
    isLoading: boolean;
    onInitFeed(tag: string): void;
}

type FeedContainerProps = OwnProps & StateProps;

const renderList = (list: Vod[]) => (
    list.map((vod: Vod) => {
        const {
            content_id,
        } = vod;

        return (
            <Card
                key={content_id}
                content_id={content_id}
                {...getCardContent(vod)}
            />
        );
    })
);

const renderCarousel = (list: CarouselType) => {
    const filteredList = excludeBannedCards(list.includes);

    return (
        filteredList.length &&
        <Carousel
            title={list.title}
            margin="s"
            carouselId={list.carousel_id}
            key={list.carousel_id}
        >
            {renderList(filteredList)}
        </Carousel>
    );
};

const renderCard = (vod: Vod) =>
    (
        vod.includes && vod.includes[0].banned
            ? null
            : <div key={vod.content_id} className="Feed-Item">
                <Card
                    content_id={vod.content_id}
                    {...getCardContent(vod)}
                    poster={vod.onto_poster}
                    img={vod.thumbnail}
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
        const { category, content, isLoading } = this.props;

        if (isLoading) {
            const size = (category === 'blogger') ? 'medium' : 'small';

            return (
                <EmptyCards carouselNumber={4} cardsNumber={10} cardSize={size} />
            );
        }

        return (
            <div className="Feed">
                {
                    content.map((item: FeedItem) =>
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
    isLoading: state.feedIsLoading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitFeed: (tag: string) => dispatch(setFeedThunk(tag)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
