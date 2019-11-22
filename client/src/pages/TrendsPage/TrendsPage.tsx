import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import Tabs from '../../components/Tabs/Tabs';
import TrendsList from '../../components/TrendsList/TrendsList';
import { State, Dispatch } from '../../store/createStore';
import { setTrendsThunk } from '../../store/thunks';

interface TrendsPageProps extends RouteComponentProps<TParam> {
    trendVariant: string;
    period: number;
    onSetTrends(period?: number): void;
}

interface TParam {
    category: string;
}

class TrendsPage extends Component<TrendsPageProps> {
    public componentDidMount() {
        const { period, onSetTrends } = this.props;
        onSetTrends(period);
    }

    public componentDidUpdate(prevProps: TrendsPageProps) {
        const { period, onSetTrends } = this.props;
        if (period !== prevProps.period) {
            onSetTrends(period);
        }
    }

    public render() {
        const { category } = this.props.match.params;
        const { trendVariant } = this.props;

        return (
            <>
                <div className="TitleWrapper">
                    <Title cn="TitleWrapper-Item">Самое популярное</Title>
                    <Tabs className="TitleWrapper-Item" />
                </div>
                <TrendsList variant={trendVariant} category={category}/>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trendVariant: state.trendVariant,
    period: state.period,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetTrends: (period?: number) => dispatch(setTrendsThunk(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
