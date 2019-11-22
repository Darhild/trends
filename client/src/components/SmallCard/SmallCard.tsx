import React from 'react';
import { ReactComponent as Grow } from '../../images/svg/grow.svg';
import { ReactComponent as Plus } from '../../images/svg/plus.svg';
import './SmallCard.scss';

export interface SmallCardProps {
    poster: string;
    desc: string;
}

const SmallCard = ({ desc, poster }: SmallCardProps) => {
    const bg = poster ? `url(${poster})` : 'radial-gradient(137% 83.13% at 126% 113.12%, #FF0099 0%, #F78B69 100%)';

    return (
        <div className="SmallCard" style={ { backgroundImage: bg } }>
            <Plus className="SmallCard-Icon" width="28"/>
            {poster && <>
                <Grow className="SmallCard-Icon SmallCard-Icon_shadowed"/>
                <span className="SmallCard-Placeholder"></span>
            </>}
            <div className="SmallCard-Footer">
                {!poster && <div className="SmallCard-Label">Набирает популярность</div>}
                <div className="SmallCard-Title">{desc}</div>
            </div>
        </div>
    );
};

export default SmallCard;
