import React from 'react';
import './style.scss';

interface TrendCardProps {
    img: string;
    desc: string;
    icon?: string;
}

const TrendCard = ({ img, desc }: TrendCardProps) => {
   return (
        <div className="TrendCard" style={{ backgroundImage: `url(${img})` }}>
            <p>{desc}</p>
        </div>
   );
};

export default TrendCard;
