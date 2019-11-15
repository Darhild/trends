import React from 'react';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';
import TrendCard from '../../components/TrendCard/TrendCard';
import Card from '../../components/Card/Card';
import Carousel from '../../components/Carousel/Carousel';
import Story from '../../components/Story/Story';
import Trend, { TrendVideo } from '../../types/trend';
import { ReactComponent as Checkmark } from '../../images/svg/checkmark.svg';
import { ReactComponent as Camera } from '../../images/svg/camera.svg';
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
    public state = {
        isSubscribed: false,
    };

    public subscribe = () => {
        this.setState((state) => ({
            isSubscribed: !state.isSubscribed,
        }));
    }

    public render() {
        const { ratingPosition } = this.props.match.params;
        const { trends } = this.props;
        const { isSubscribed } = this.state;
        const currentTrend = trends[Number(ratingPosition) - 1];
        const { desc, img, poster, videos, stories } = currentTrend;
        const subscribeCn = classnames(
            'OneTrendPage-Button',
            'OneTrendPage-Button_subscribe',
            isSubscribed && 'OneTrendPage-Button_subscribe_off');

        return (
            <>
                <TrendCard
                    className="OneTrendPage_TrendCard"
                    desc={desc}
                    img={img}
                    poster={poster}
                    ratingPosition={Number(ratingPosition)} />
                <div className={subscribeCn} onClick={this.subscribe}>
                    {isSubscribed && <>
                        <Checkmark className="OneTrendPage-Icon"/>
                        <span>Вы подписаны</span>
                    </>}
                    {!isSubscribed && <span>Подписаться</span>}
                </div>
                <Carousel canBeHidden={false} margin="s">
                    {stories.map((story) =>
                        <Story thumbnail={story.thumbnail} title={story.title}/>)}
                </Carousel>
                <div className="OneTrendPage-List">
                    {videos.map((props: TrendVideo) =>
                    <div className="OneTrendPage-Item">
                        <Card {...props} content_type="trend"/>
                    </div>)}
                </div>
                <div className="OneTrendPage-Button OneTrendPage-Button_addVideo">
                    <Camera className="OneTrendPage-Icon"/>
                    <span>Добавить видео</span>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(OneTrendPage);
