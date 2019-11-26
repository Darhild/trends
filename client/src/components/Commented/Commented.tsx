import React from 'react';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { ReactComponent as Bubble } from '../../images/svg/chat_bubble.svg';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import Duration from '../Duration/Duration';
import Tabs from '../Tabs/Tabs';
import tabsContent from './../../tabsContent';
import { connect } from 'react-redux';
import { setVideosPeriod } from '../../store/actions';
import { setCommentedThunk } from '../../store/thunks';
import { State, Dispatch } from '../../store/createStore';
import { getPlural } from '../../utils';
import './Commented.scss';

interface CommentedProps {
    category: string;
    videos: CommentedVideoProps[];
    videosPeriod: number;
    onSetCommented: (category: string, period: number) => void;
    onTabClickSetPeriod(period: number): void;
}

interface CommentedVideoProps {
    content_id: string;
    title: string;
    duration: number;
    thumbnail: string;
    lastComment: string;
    commentsCount: number;
}

const CommentedSubtitle = (props: CommentedVideoProps) => {
    const { lastComment, commentsCount } = props;

    const dictionary = {
        one: 'комментраий',
        few: 'комментария',
        many: 'комментариев',
    };

    return (
        <>
            {lastComment && <div className="Commented-LastComment">{lastComment}</div>}
            {commentsCount && <div className="Commented-Count">
                <Bubble className="Commented-Bubble" width="16" height="15"/>
                Еще {commentsCount} {getPlural(commentsCount, dictionary)}
            </div>}
        </>
    );
};

class Commented extends React.Component<CommentedProps> {
    public componentDidMount() {
        const { category, videosPeriod, onSetCommented } = this.props;
        onSetCommented(category, videosPeriod);
    }

    public componentDidUpdate(prevProps: CommentedProps) {
        const { category, videosPeriod, onSetCommented } = this.props;
        if (category !== prevProps.category || videosPeriod !== prevProps.videosPeriod) {
            onSetCommented(category, videosPeriod);
        }
    }

    public render() {
        const { videos, videosPeriod, onTabClickSetPeriod } = this.props;
        const trendsTabs = (
            <Tabs
                className="Carousel-Tabs"
                period={videosPeriod}
                tabsContent={tabsContent}
                onTabClickSetValue={onTabClickSetPeriod}
            />
        );

        return (
            <>
                {!!videos.length && <Carousel title="Самые обсуждаемые видео" margin="s" tabs={trendsTabs}>
                    {videos.map((props) => (
                        <div key={props.content_id} className="Commented-Item">
                            <Grow className="Commented-Grow" width="28" height="28"/>
                            <Card
                                title={props.title}
                                titleClass="Card-Title_lines_one"
                                size="big"
                                content={<CommentedSubtitle {...props}/>}
                                details={<Duration duration={props.duration}/>}
                                {...props}
                            />
                        </div>
                    ))}
                </Carousel>}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    videos: state.commented,
    videosPeriod: state.settings.videosPeriod,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetCommented: (category: string, period: number) =>
        dispatch(setCommentedThunk(category, period)),
    onTabClickSetPeriod: (period: number) => dispatch(setVideosPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commented);
