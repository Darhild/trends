import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Trends from '../../components/Trends/Trends';
import List from '../../components/List/List';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';

import { items } from '../../feed.json';
import { items as blogersItems } from '../../blogers.json';

const dramas: any[] = items[3].includes;
const blogers: any[] = blogersItems[0].includes;

export interface TParam { category?: string; }

interface MainProps extends RouteComponentProps<TParam> {
    content: any;
}

const mapStateToProps = (state: State, ownProps: MainProps) => {
    const category: any  =  ownProps.match.params.category;

    return {
        content: state[category],
    };
};

class Main extends Component<MainProps> {
    public render() {
        const category = this.props.match.params.category || 'main';

        return (
            <>
                <Trends category={category} />
                <List cards={blogers} title={blogersItems[0].title} carouselId={blogersItems[0].carousel_id} content="blogers"/>
                <List cards={dramas} title={items[3].title} carouselId={items[3].carousel_id} content="series"/>
            </>
        );
    }
}

export default connect(mapStateToProps)(Main);
