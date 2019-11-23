import React from 'react';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import { ReactComponent as Bubble } from '../../images/svg/chat_bubble.svg';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import Duration from '../Duration/Duration';
import { connect } from 'react-redux';
import { setCommentedThunk } from '../../store/thunks';
import { State, Dispatch } from '../../store/createStore';
import './Commented.scss';

interface CommentedProps {
    category: string;
    videos: CommentedVideoProps[];
    onSetCommented: (caterory: string) => void;
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

    return (
        <>
            {lastComment && <div className="Commented-LastComment">{lastComment}</div>}
            {commentsCount && <div className="Commented-Comments">
                <Bubble className="Commented-Bubble" width="16" height="15"/>
                Еще {commentsCount} комментария
            </div>}
        </>
    );
};

class Commented extends React.Component<CommentedProps> {
    public componentDidMount() {
        const { category, onSetCommented } = this.props;
        onSetCommented(category);
    }

    public componentDidUpdate(prevProps: CommentedProps) {
        const { category, onSetCommented } = this.props;
        if (category !== prevProps.category) {
            onSetCommented(category);
        }
    }

    public render() {
        const { videos } = this.props;

        return (
            <>
                {!!videos.length && <Carousel title="Самые обсуждаемые видео" margin="s">
                    {videos.map((props) => (
                        <div className="Commented-Item">
                            <Grow className="Commented-Grow" width="28" height="28"/>
                            <Card
                                title={props.title}
                                subtitle={<CommentedSubtitle {...props}/>}
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetCommented: (category: string) =>
        dispatch(setCommentedThunk(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commented);
