import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import Tabs from '../../components/Tabs/Tabs';
import tabsContent from './../../tabsContent';
import TrendsList from '../../components/TrendsList/TrendsList';
import { State, Dispatch } from '../../store/createStore';
import { setTrendsThunk } from '../../store/thunks';
import { setPeriod } from './../../store/actions';

interface TrendsPageProps extends RouteComponentProps<TParam> {
    trendVariant: string;
    period: number;
    onSetTrends(period?: number): void;
    onTabClickSetPeriod(period: number): void;
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
        const { trendVariant, period, onTabClickSetPeriod } = this.props;

        return (
            <>
                <Title cn="Trends-Title">Самое популярное</Title>
                <Tabs
                    period={period}
                    tabsContent={tabsContent}
                    onTabClickSetValue={onTabClickSetPeriod}
                />
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
    onTabClickSetPeriod: (period: number) => dispatch(setPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
