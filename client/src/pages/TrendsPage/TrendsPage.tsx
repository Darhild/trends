import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import TrendsList from '../../components/TrendsList/TrendsList';
import { State } from '../../store/createStore';

interface TrendsPageProps extends RouteComponentProps<TParam> {
    variant: string;
}

interface TParam {
    category: string;
}

class TrendsPage extends Component<TrendsPageProps> {
    public render() {
        const { category } = this.props.match.params;
        const { variant } = this.props;

        return (
            <>
                <Title>Самое популярное</Title>
                <TrendsList variant={variant} category={category}/>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    variant: state.experiment,
});

export default connect(mapStateToProps)(TrendsPage);
