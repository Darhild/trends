import React from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import TrendCard from '../../components/TrendCard/TrendCard';
import Card from '../../components/Card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Story from '../../components/Story/Story';
import Button from '../../components/Button/Button';
import Trend from '../../types/trend';
import { State } from '../../store/createStore';
import './OneTrendPage.scss';

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
    public render() {
        const { ratingPosition } = this.props.match.params;
        const { trends } = this.props;
        const currentTrend = trends[Number(ratingPosition) - 1];
        const { desc, img, poster, videos, stories } = currentTrend;

        return (
            <>
                <TrendCard
                    className="OneTrendPage_TrendCard"
                    desc={desc}
                    img={img}
                    poster={poster}
                    ratingPosition={Number(ratingPosition)} />
                <Button type="subscribe" />
                <Carousel canBeHidden={false} margin="s">
                    {stories.map((story) =>
                        <Story thumbnail={story.thumbnail} title={story.title}/>)}
                </Carousel>
                <div className="OneTrendPage-List">
                    {videos.map(({ ...props }) =>
                    <div className="OneTrendPage-Item">
                        <Card {...props} content_type="trend"/>
                    </div>)}
                </div>
                <Button type="addVideo" />
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(OneTrendPage);
