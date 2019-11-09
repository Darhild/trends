import React, { Component } from 'react';
import './FeedContainer.scss';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';

interface OwnProps {
    category: string;
}

interface StateProps {
    content: any;
}

type FeedContainerProps = OwnProps & StateProps;

const renderList = (list: any) =>
    (
        list.includes.map((card: any) => {
            if (card.includes && card.includes[0].banned) {
                return null;
            }

            return <Card card={card} content_type={card.supertag || 'series'} key={card.content_id}/>;
        })
    );

const renderCarousel = (list: any) =>
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
                    this.props.content.map((list: any) =>
                        list.content_type_name === 'carousel'
                            ? renderCarousel(list)
                            : <Card card={list} key={list.content_id} content_type="vod" />)
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State, ownProps: OwnProps) => ({
  content: state[ownProps.category],
});

export default connect(mapStateToProps)(FeedContainer);
