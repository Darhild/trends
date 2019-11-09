import React, { Component } from 'react';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
import TrendCard from '../../components/TrendCard/TrendCard';
import Trend from '../../types/trend';
import Title from '../../components/Title/Title';

interface Props {
    trends: Trend[];
}

class TrendsPage extends Component<Props> {
    public render() {
        const { trends } = this.props;

        return (
            <>
                <Title>Сейчас популярно</Title>
                {trends.map((props) => <TrendCard {...props} />)}
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

export default connect(mapStateToProps)(TrendsPage);
