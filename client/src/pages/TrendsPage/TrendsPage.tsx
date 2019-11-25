import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import Title from '../../components/Title/Title';
import Tabs from '../../components/Tabs/Tabs';
import tabsContent from './../../tabsContent';
import TrendsList from '../../components/TrendsList/TrendsList';
import { State, Dispatch } from '../../store/createStore';
import { setTrendsThunk } from '../../store/thunks';
import { setTrendsPeriod } from './../../store/actions';

interface TrendsPageProps extends RouteComponentProps<TParam> {
    trendVariant: string;
    trendsPeriod: number;
    source: string;
    onSetTrends(category: string, period: number, source?: string): void;
    onTabClickSetPeriod(period: number): void;
}

interface TParam {
    category: string;
}

class TrendsPage extends Component<TrendsPageProps> {
    public componentDidMount() {
        const { category } = this.props.match.params;
        const { trendsPeriod, source, onSetTrends } = this.props;
        category === 'main'
            ? onSetTrends(category, trendsPeriod, source)
            : onSetTrends(category, trendsPeriod);
    }

    public componentDidUpdate(prevProps: TrendsPageProps) {
        const { category } = this.props.match.params;
        const { trendsPeriod, source, onSetTrends } = this.props;
        if (trendsPeriod !== prevProps.trendsPeriod || source !== prevProps.source) {
            onSetTrends(category, trendsPeriod, source);
        }
    }

    public render() {
        const { category } = this.props.match.params;
        const { trendVariant, trendsPeriod, onTabClickSetPeriod } = this.props;

        return (
            <>
                <Title cn="Trends-Title">Самое популярное</Title>
                <Tabs
                    period={trendsPeriod}
                    tabsContent={tabsContent}
                    onTabClickSetValue={onTabClickSetPeriod}
                />
                <TrendsList variant={trendVariant} category={category}/>
            </>
        );
    }
}

const mapStateToProps = (state: State) => ({
    trendVariant: state.settings.trendVariant,
    trendsPeriod: state.settings.trendsPeriod,
    source: state.settings.source,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetTrends: (category: string, period: number, source?: string) => (
        dispatch(setTrendsThunk(category, period, source))),
    onTabClickSetPeriod: (period: number) => dispatch(setTrendsPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);
