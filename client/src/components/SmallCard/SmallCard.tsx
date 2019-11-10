import React from 'react';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import './SmallCard.scss';

export interface SmallCardProps {
    img: string;
    desc: string;
}

const SmallCard = ({ img, desc }: SmallCardProps) => (
    <div className="SmallCard" style={ { backgroundImage: `url(${img})` } }>
        <Grow className="SmallCard-Icon"/>
        <span className="SmallCard-Placeholder"></span>
        <p className="SmallCard-Footer">{desc}</p>
    </div>
);

export default SmallCard;
