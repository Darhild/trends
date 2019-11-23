import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import FeedPlayer from '../../components/FeedPlayer/FeedPlayer';
import Trends from '../../components/Trends/Trends';
import Commented from '../../components/Commented/Commented';
import FeedContainer from '../../components/FeedContainer/FeedContainer';

interface TParam { category?: string; }

class Main extends Component<RouteComponentProps<TParam>> {
    public render() {
        const category = this.props.match.params.category || 'main';

        return (
            <>
                {category === 'main' && <FeedPlayer />}
                <Trends category={category} />
                <Commented category={category} />
                <FeedContainer category={category}/>
            </>
        );
    }
}

export default Main;
