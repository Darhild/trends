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
    onInitTrends(): void;
}

class Trends extends Component<TrendsProps> {
    public componentDidMount() {
        this.props.onInitTrends();
    }

    public renderItems = () => {
        const { trends, category, trendVariant, allTrendsOnMain } = this.props;
        const url = `/${category}/trends`;

        if (allTrendsOnMain) {
            return (
                <Carousel title="Самое популярно" margin="s">
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitTrends: () => dispatch(setTrendsThunk()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Trends);
