import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Trends from '../../components/Trends/Trends';
import Contents from '../../components/Contents/Contents';
import { connect } from 'react-redux';
import { State } from '../../store/createStore';

export interface TParam { category?: string; }

interface MainProps extends RouteComponentProps<TParam> {
    content: any;
}

const mapStateToProps = (state: State, ownProps: MainProps) => {
    const category: any  =  ownProps.match.params.category || 'main';

    return {
        content: state[category],
    };
};

class Main extends Component<MainProps> {
    public render() {
        const category = this.props.match.params.category || 'main';
        const content = this.props.content;

        return (
            <>
                <Trends category={category} />
                <Contents content={content}/>
            </>
        );
    }
}

export default connect(mapStateToProps)(Main);
