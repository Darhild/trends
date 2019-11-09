import React from 'react';
import './style.scss';
import SmallCard, { SmallCardProps } from '../SmallCard/SmallCard';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import { State } from '../../store/createStore';
import { connect } from 'react-redux';
interface TrendsProps {
    trends: SmallCardProps[];
    category: string;
}

const mapStateToProps = (state: State) => ({
    trends: state.trends,
});

const Trends = ({ trends, category }: TrendsProps) =>
    (
        <div className="Trends">
            <Carousel title="Сейчас популярно" margin="s">
                {trends.map((props) => <SmallCard {...props}/>)}
            </Carousel>
            <Link to={`/${category}/trends`} className="Trends-More">Показать все популярные темы</Link>
        </div>
    );

export default connect(mapStateToProps)(Trends);
