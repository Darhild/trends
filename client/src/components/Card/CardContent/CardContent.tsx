import React from 'react';
import { CardProps } from '../../Card/Card';
import { dateUtils } from './../../../utils';
import { ReactComponent as Like } from './../../../images/svg/like.svg';

const CardContent = ({ card, content_type }: CardProps) => {
    const LikeIcons = (
        <div className="Card-LikeOrNot">
            <div className="Card-Like">
                <Like/>
            </div>
            <div className="Card-Dislike">
                <Like/>
            </div>
        </div>
    );

    const blogersContent = (
        <>
            <div className="Card-Text">
                <div className="Card-Title" >
                    {card.computed_title}
                </div>
                <div className="Card-Subtitle">
                    {dateUtils(card.release_date_ut)}
                </div>
            </div>
        </>
    );

    const seriesContent = (
        <>
            <div className="Card-Text">
                <div className="Card-Title" >
                    {card.title}
                </div>
                <div className="Card-Subtitle">
                    {card.release_year || null}
                    {card.genres ? ` · ${card.genres.toString()}` : null}
                </div>
            </div>
            {content_type === 'vod' && LikeIcons}
        </>
    );

    return (
        <div className="Card-Content" >
            {content_type === 'blogger' ? blogersContent : seriesContent}
        </div>
    );
  };

export default CardContent;
