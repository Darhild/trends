import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import TrendCard from '../../components/TrendCard/TrendCard';
import Card from '../../components/Card/Card';
import Title from '../../components/Title/Title';
import Carousel from '../../components/Carousel/Carousel';
import Story from '../../components/Story/Story';
import Button from '../../components/Button/Button';
import Trend from '../../types/trend';
import Duration from '../../components/Duration/Duration';
import { State, Dispatch } from '../../store/createStore';
import { setCollectionThunk, setTrendsThunk } from '../../store/thunks';
import { getCardContent } from './../../utils/feed';
import './OneTrendPage.scss';
import { Vod } from '../../types/FeedItem';

interface TParam {
    category: string;
    collectionId: string;
}

interface OneTrendPageProps {
    trend: Trend | undefined;
    collection: Vod[];
    period: number;
    source: string;
    onSetCollection: (collectionId: string) => void;
    onSetTrends(category: string, period: number, source?: string): void;
}

class OneTrendPage extends React.Component<OneTrendPageProps & RouteComponentProps<TParam>> {
    public componentDidMount() {
        const { trend, period, source, onSetCollection, onSetTrends } = this.props;
        const { category } = this.props.match.params;
        if (!trend) {
            category === 'main'
            ? onSetTrends(category, period, source)
            : onSetTrends(category, period);
        }
        const { collectionId } = this.props.match.params;
        const params = queryString.parse(this.props.location.search);
        if (params.source === 'efir') {
            onSetCollection(collectionId);
        }
    }

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
                title={<div style={{ fontWeight: 500 }}>{vod.title}</div>}
                details={<Duration duration={vod.duration} />}
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
        const { trend, collection } = this.props;
        if (trend) {
            const { desc, img, poster, stories, collectionLength } = trend;

            return (
                <>
                    <div className="OneTrendPage-Header">
                        <TrendCard
                            className="OneTrendPage_TrendCard"
                            desc={desc}
                            img={img}
                            poster={poster}
                            collectionLength={collectionLength}
                            ratingPosition={1}
                            bgBig={true} />
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
                    {collection && this.renderCollection(collection)}
                </>
            );
        }

        return null;
    }
}

const mapStateToProps = (state: State, props: RouteComponentProps<TParam>) => {
    const { collectionId } = props.match.params;
    const params = queryString.parse(props.location.search);
    const currentTrend = state.trends.find((trend) => {
        if (params.source === 'efir') {
            return trend.id === collectionId;
        }

        return trend.desc === collectionId;
    });

    return {
        trend: currentTrend,
        period: state.settings.period,
        source: state.settings.source,
        collection: currentTrend ? currentTrend.collection : [],
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetCollection: (id: string) => dispatch(setCollectionThunk(id)),
    onSetTrends: (category: string, period: number, source?: string) => (
        dispatch(setTrendsThunk(category, period, source))),
});

export default connect(mapStateToProps, mapDispatchToProps)(OneTrendPage);
