import React from 'react';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import './style.scss';

export interface SmallCardProps {
    img: string;
    desc: string;
    icon?: string;
}

const SmallCard = ({img, desc, icon}: SmallCardProps) => {
    return (
        <div className="SmallCard" style={ {backgroundImage: `url(${img})`} }>
            <Grow className="SmallCard-Icon"/>
            <span className="SmallCard-Placeholder"></span>
            <p className="SmallCard-Footer">{desc}</p>
        </div>
    );
};

export default SmallCard;
