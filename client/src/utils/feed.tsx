import React from 'react';
import Rating from './../components/Rating/Rating';
import Duration from './../components/Duration/Duration';
import { Vod } from './../types/FeedItem';
import { dateUtils } from './index';

interface Content {
    title: React.ReactNode;
    subtitle: React.ReactNode;
    rightContent: React.ReactNode;
    details: React.ReactNode;
    size: string;
    img: string;
}

export const getCardContent = ({
    title,
    release_year,
    genres,
    supertag,
    release_date_ut,
    duration,
    percentage_score,
    rating_kp,
    thumbnail,
    onto_poster,
}: Vod) => {
    const content: Content = {
        title,
        subtitle: null,
        rightContent: null,
        details: null,
        size: 'small',
        img: onto_poster ? onto_poster : thumbnail,
    };

    switch (supertag) {
        case 'blogger':
            content.subtitle = release_date_ut ? dateUtils(release_date_ut) : null;
            content.details = <Duration duration={duration} />;
            content.size = 'medium';
            content.img = thumbnail;
            break;
        case 'music':
            content.subtitle = release_date_ut ? dateUtils(release_date_ut) : null;
            content.details = <Duration duration={duration} />;
            content.size = 'medium';
            break;
        default:
            content.subtitle = `${release_year}`;
            content.subtitle += genres ? ` · ${genres.join(', ')}` : '';
            content.details = <Rating percentage={percentage_score} rating={rating_kp} />;
    }

    return content;
};
