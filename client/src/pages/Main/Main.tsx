import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Player from '../../components/Player/Player';
import Trends from '../../components/Trends/Trends';
import FeedContainer from '../../components/FeedContainer/FeedContainer';

interface TParam { category?: string; }

class Main extends Component<RouteComponentProps<TParam>> {
    public render() {
        const category = this.props.match.params.category || 'main';

        return (
            <>
                {category === 'main' && <Player />}
                <Trends category={category} />
                <FeedContainer category={category}/>
            </>
        );
    }
}

export default Main;
