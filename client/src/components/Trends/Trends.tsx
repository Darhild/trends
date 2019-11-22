import React, { Component } from 'react';
import './Trends.scss';
import SmallCard, { SmallCardProps } from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { State, Dispatch } from '../../store/createStore';
import Title from './../Title/Title';
import Tabs from './../Tabs/Tabs';
import tabsContent from './../../tabsContent';
import { connect } from 'react-redux';
import { setTrendsThunk } from '../../store/thunks';
import { setPeriod } from './../../store/actions';
import TrendsList from '../TrendsList/TrendsList';

interface TrendsProps {
    trendVariant: string;
    allTrendsOnMain: boolean;
    trends: SmallCardProps[];
    category: string;
    period: number;
    source: string;
    onSetTrends(category: string, period: number, source?: string): void;
    onTabClickSetPeriod(period: number): void;
}

class Trends extends Component<TrendsProps> {
    public componentDidMount() {
        const { category, period, source, onSetTrends } = this.props;
        onSetTrends(category, period, source);
    }

    public componentDidUpdate(prevProps: TrendsProps) {
        const { category, period, source, onSetTrends } = this.props;
        if (category !== prevProps.category || period !== prevProps.period || source !== prevProps.source) {
            onSetTrends(category, period, source);
        }
    }

    public renderItems = () => {
        const { trends, category, trendVariant, allTrendsOnMain, period, onTabClickSetPeriod } = this.props;
        const url = `/${category}/trends`;

        const trendsTabs = (
            <Tabs
                className="Carousel-Tabs"
                period={period}
                tabsContent={tabsContent}
                onTabClickSetValue={onTabClickSetPeriod}
            />
        );

        if (allTrendsOnMain) {
            return (
                <Carousel title="Самое популярное" margin="s" routeUrl={url} tabs={trendsTabs}>
                    {
                        trends.map((props, index) => (
                            <Link className="Trends-Link" to={`${url}/${index + 1}`}>
                                <SmallCard {...props}/>
                            </Link>
                        ))
                    }
                </Carousel>
            );
        }

        return (
            <>
                <Title cn="Trends-Title" url={url}>Самое популярное</Title>
                <Tabs
                    period={period}
                    tabsContent={tabsContent}
                    onTabClickSetValue={onTabClickSetPeriod}
                />
                <TrendsList category={category} variant={trendVariant} shortVariant />
            </>
        );
    }

    public render() {
        const { category } = this.props;

        return (
            <div className="Trends">
                {this.renderItems()}
                <Link to={`/${category}/trends`} className="Trends-More">Показать все популярные темы</Link>
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    allTrendsOnMain: state.allTrendsOnMain,
    trendVariant: state.trendVariant,
    trends: state.trends,
    period: state.period,
    source: state.source,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetTrends: (category: string, period: number, source?: string) => (
        dispatch(setTrendsThunk(category, period, source))),
    onTabClickSetPeriod: (period: number) => dispatch(setPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
