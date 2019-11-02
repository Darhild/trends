import React, { useState,  } from 'react';
import './style.scss';
import SmallCard, { SmallCardProps } from '../SmallCard/SmallCard';
import TrendCard from '../TrendCard/TrendCard';
import Carousel from '../Carousel/Carousel';
interface TrendsProps {
    trends: SmallCardProps[];
}

const renderItems = (trends: SmallCardProps[], horizontal: boolean) => {
    if (horizontal) {
        return (
            <Carousel>
                {trends.map((props) => <SmallCard {...props}/>)}
            </Carousel>
        );
    } else {
        return trends.map((props) => <TrendCard {...props}/>);
    }
};

const Trends = ({ trends }: TrendsProps) => {
    const [horizontal, setHorizontal] = useState(true);

    const openTrends = () => {
        setHorizontal(false)
    };

    return (
        <div className="Trends">
            {renderItems(trends, horizontal)}
            {/* { horizontal && <button onClick={openTrends} className="Trends-More">Показать все популярные темы</button>} */}
        </div>
    );
};

export default Trends;
