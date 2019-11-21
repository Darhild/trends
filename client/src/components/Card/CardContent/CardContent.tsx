import React from 'react';
import classnames from 'classnames';
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

    const trendContent = (
        <>
            <div className="Card-Text">
                <div className="Card-Title" >
                    {computed_title}
                </div>
                <div className="Card-Subtitle">
                    <div>187 тыс. просмотров</div>
                    {release_date_ut && dateUtils(release_date_ut)}
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

    const content = (contentType: string) => {
        switch (contentType) {
            case 'blogger':
                return blogersContent;
            case 'trend':
                return trendContent;
            case 'promo':
                return trendContent;
            default:
                return seriesContent;
        }
    };

    const cnContent = classnames('Card-Content', `Card-Content_type_${content_type}`);

    return (
        <div className={cnContent} >
            {content(content_type)}
        </div>
    );
  };

export default CardContent;
