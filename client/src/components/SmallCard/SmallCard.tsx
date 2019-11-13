import React from 'react';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import './SmallCard.scss';

export interface SmallCardProps {
    poster: string;
    desc: string;
}

const SmallCard = ({ desc, poster }: SmallCardProps) => (
    <div className="SmallCard" style={ { backgroundImage: `url(${poster})` } }>
        <Grow className="SmallCard-Icon"/>
        <span className="SmallCard-Placeholder"></span>
        <p className="SmallCard-Footer">{desc}</p>
    </div>
);

export default SmallCard;
