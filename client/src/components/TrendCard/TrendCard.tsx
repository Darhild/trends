import React from 'react';
import Trend from '../../types/trend';
import './style.scss';

const TrendCard = ({ img, desc }: Trend) =>
    (
        <div className="TrendCard" style={{ backgroundImage: `url(${img})` }}>
            <p>{desc}</p>
        </div>
    );

export default TrendCard;
