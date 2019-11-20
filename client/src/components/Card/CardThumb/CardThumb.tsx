import React from 'react';
import { CardProps } from './../../../types/CardProps';
import CardDetails from './../CardDetails/CardDetails';

const changeImageSize = (image: string | undefined) => image && image.replace(/\/orig/, '/400x300');

const CardThumb = ({
        thumbnail,
        onto_poster,
        duration, rating_kp,
        percentage_score,
        content_type,
    }: CardProps) => {
    const poster = changeImageSize(onto_poster);
    const cardPoster = <img src={poster} className="Card-Poster" alt="" />;
    const img = (content_type === 'series' || content_type === 'movie')
            ? poster
            : changeImageSize(thumbnail);

    return (
        <div className="Card-Thumb" style={{ backgroundImage: `url(${img})` }}>
            {content_type === 'vod' && cardPoster}
            <CardDetails
                duration={duration}
                rating_kp={rating_kp}
                percentage_score={percentage_score}
                content_type={content_type}
            />
        </div>
    );
  };

export default CardThumb;
