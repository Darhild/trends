import React, { Component } from 'react';
import './Trends.scss';
import SmallCard, { SmallCardProps } from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { State, Dispatch } from '../../store/createStore';
import { connect } from 'react-redux';
import { setTrendsThunk } from '../../store/thunks';

interface TrendsProps {
    trends: SmallCardProps[];
    category: string;
    onInitTrends(): void;
}

class Trends extends Component<TrendsProps> {
    public componentDidMount() {
        this.props.onInitTrends();
    }

    public render() {
        const { trends, category } = this.props;

        return (
            <div className="Trends">
                <Carousel title="Сейчас популярно" margin="s">
                    {trends.map((props, index) =>
                    <Link className="Trends-Link" to={`/${category}/trends/${index + 1}`}>
                        <SmallCard {...props}/>
                    </Link>)}
                </Carousel>
                <Link to={`/${category}/trends`} className="Trends-More">Показать все популярные темы</Link>
            </div>
        );
    }
}


const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    onInitTrends: () => dispatch(setTrendsThunk()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Trends);
