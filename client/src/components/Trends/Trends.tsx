import React, { Component } from 'react';
import './Trends.scss';
import SmallCard from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { State, Dispatch } from '../../store/createStore';
import Title from './../Title/Title';
import Tabs from './../Tabs/Tabs';
import tabsContent from './../../tabsContent';
import { connect } from 'react-redux';
import { setTrendsThunk } from '../../store/thunks';
import { setTrendsPeriod } from './../../store/actions';
import TrendsList from '../TrendsList/TrendsList';
import Trend from '../../types/trend';

interface TrendsProps {
    trendVariant: string;
    allTrendsOnMain: boolean;
    trends: Trend[];
    category: string;
    trendsPeriod: number;
    source: string;
    onSetTrends(category: string, period: number, source?: string): void;
    onTabClickSetPeriod(period: number): void;
}

class Trends extends Component<TrendsProps> {
    public componentDidMount() {
        this.setTrends();
    }

    public componentDidUpdate(prevProps: TrendsProps) {
        const { category, trendsPeriod, source } = this.props;
        if (category !== prevProps.category || trendsPeriod !== prevProps.trendsPeriod || source !== prevProps.source) {
            this.setTrends();
        }
    }

    public setTrends = () => {
        const { category, trendsPeriod, source, onSetTrends } = this.props;

        if (category === 'main') {
            onSetTrends(category, trendsPeriod, source);
        } else {
            onSetTrends(category, trendsPeriod);
        }
    }

    public renderItems = () => {
        const { trends, category, trendVariant, allTrendsOnMain, trendsPeriod, onTabClickSetPeriod } = this.props;
        const url = `/${category}/trends`;

        const trendsTabs = (
            <Tabs
                period={trendsPeriod}
                tabsContent={tabsContent}
                onTabClickSetValue={onTabClickSetPeriod}
            />
        );

        const tabsWrapper = (
            <div className="Trends-Wrapper">
                <Title cn="Trends-Title" url={url}>Самое популярное</Title>
                {trendsTabs}
            </div>
        );

        if (allTrendsOnMain && trends.length > 0) {
            return (
                <Carousel title="Самое популярное" margin="s" routeUrl={url} tabs={trendsTabs}>
                    {
                        trends.map((props) => {
                            const { id, desc, source, poster, img } = props;
                            const urlId = id || desc;
                            const image = source === 'google' ? img : poster;

                            return (
                                <Link
                                    key={urlId}
                                    className="Trends-Link"
                                    to={`${url}/${urlId}?source=${source}`}
                                >
                                    <SmallCard {...props} poster={image}/>
                                </Link>
                            );
                        })
                    }
                </Carousel>
            );
        }

        return (
            <>
                {tabsWrapper}
                <TrendsList category={category} variant={trendVariant} shortVariant />
            </>
        );
    }

    public render() {
        const { trends, category } = this.props;

        return (
            <div className="Trends">
                {this.renderItems()}
                {
                    trends.length > 0
                        && <Link to={`/${category}/trends`} className="Trends-More">Показать все популярные темы</Link>
                }
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    allTrendsOnMain: state.settings.allTrendsOnMain,
    trendVariant: state.settings.trendVariant,
    trends: state.trends,
    trendsPeriod: state.settings.trendsPeriod,
    source: state.settings.source,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetTrends: (category: string, period: number, source?: string) =>
        dispatch(setTrendsThunk(category, period, source)),
    onTabClickSetPeriod: (period: number) => dispatch(setTrendsPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
