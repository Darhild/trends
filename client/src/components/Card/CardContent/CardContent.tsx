import React from 'react';
import { CardContentProps } from './../../../types/CardProps';
import { dateUtils } from './../../../utils';
import { ReactComponent as Like } from './../../../images/svg/like.svg';

const CardContent = ({
        title,
        computed_title,
        release_date_ut,
        release_year,
        genres,
        content_type,
    }: CardContentProps) => {
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
                    {computed_title}
                </div>
                <div className="Card-Subtitle">
                    {release_date_ut ? dateUtils(release_date_ut) : null}
                </div>
            </div>
        </>
    );

    const seriesContent = (
        <>
            <div className="Card-Text">
                <div className="Card-Title" >
                    {title}
                </div>
                <div className="Card-Subtitle">
                    {release_year || null}
                    {genres ? ` · ${genres.toString()}` : null}
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
