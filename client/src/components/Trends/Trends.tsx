import React, { Component } from 'react';
import './Trends.scss';
import SmallCard, { SmallCardProps } from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { State, Dispatch } from '../../store/createStore';
import { connect } from 'react-redux';
import { setTrendsThunk } from '../../store/thunks';
import TrendsList from '../TrendsList/TrendsList';

interface TrendsProps {
    trendVariant: string;
    allTrendsOnMain: boolean;
    trends: SmallCardProps[];
    category: string;
    period: number;
    onSetTrends(period?: number): void;
}

class Trends extends Component<TrendsProps> {
    public componentDidMount() {
        this.props.onSetTrends();
    }

    public componentDidUpdate(prevProps: TrendsProps) {
        const { period } = this.props;
        if (period !== prevProps.period) {
            this.props.onSetTrends(period);
        }
    }

    public renderItems = () => {
        const { trends, category, trendVariant, allTrendsOnMain } = this.props;
        const url = `/${category}/trends`;

        if (allTrendsOnMain) {
            return (
                <Carousel title="Самое популярное" margin="s">
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
            <TrendsList category={category} variant={trendVariant} shortVariant />
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onSetTrends: (period?: number) => dispatch(setTrendsThunk(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trends);
