import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import TrendCard from '../../components/TrendCard/TrendCard';
import Card from '../../components/Card/Card';
import Title from '../../components/Title/Title';
import Carousel from '../../components/Carousel/Carousel';
import Story from '../../components/Story/Story';
import Button from '../../components/Button/Button';
import Trend from '../../types/trend';
import { State } from '../../store/createStore';
import { getCardContent } from './../../utils/feed';
import './OneTrendPage.scss';
import { Vod } from '../../types/FeedItem';

interface TParam {
    category: string;
    ratingPosition: string;
}

interface OneTrendPageProps {
    trends: Trend[];
}

interface OneTrendPageState {
    isSubscribed: boolean;
}

class OneTrendPage extends React.Component<OneTrendPageProps & RouteComponentProps<TParam>, OneTrendPageState> {

    public renderCollection(videos: Vod[]) {
        const firstVideos = videos && videos.slice(0, 3);
        const lastVideos = videos && videos.slice(3);

        const renderCard = (vod: Vod, size: string) => (
            <Card
                content_id={vod.content_id}
                key={vod.content_id}
                {...getCardContent(vod)}
                size={size}
                bgColor="none"
                imgView="noClipped"
                title={<b>{vod.computed_title}</b>}
            />
        );

        return (
            <div className="OneTrendPage-Content">
                <div className="OneTrendPage-Promo">
                    {
                        firstVideos.map((vod) => (
                            <div className="OneTrendPage-Item">{renderCard(vod, 'big')}</div>
                        ))
                    }
                </div>
                <div className="OneTrendPage-List">
                    {
                        lastVideos.map((vod) => (
                            <div className="OneTrendPage-Item">{renderCard(vod, 'full')}</div>
                        ))
                    }
                </div>
            </div>
        );
    }

    public render() {
        const { ratingPosition } = this.props.match.params;
        const { trends } = this.props;
        const currentTrend = trends[Number(ratingPosition) - 1];
        const { desc, img, poster, videos, stories } = currentTrend;

        return (
            <>
                <div className="OneTrendPage-Header">
                    <TrendCard
                        className="OneTrendPage_TrendCard"
                        desc={desc}
                        img={img}
                        poster={poster}
                        ratingPosition={Number(ratingPosition)} />
                    <Button type="subscribe" />
                    <Button type="addVideo" />
                </div>
                <div className="OneTrendPage-Stories">
                    <Carousel canBeHidden={false} margin="s">
                        {stories.map((story) =>
                            <Story thumbnail={story.thumbnail} title={story.title}/>)}
                    </Carousel>
                </div>
                <Title cn="OneTrendPage-Title">Видео по теме</Title>
                {videos && this.renderCollection(videos)}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(OneTrendPage);
