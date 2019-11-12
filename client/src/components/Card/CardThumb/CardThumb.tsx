import React from 'react';
import { CardProps } from './../../../types/CardProps';

import CardDetails from './../CardDetails/CardDetails';

const CardThumb = ({ thumbnail, poster, duration, content_type, rating_kp, percentage_score }: CardProps) => {
    const cardPoster  = ( <img src={poster} className="Card-Poster" alt="" /> );
    const img = (content_type === 'vod' || content_type === 'blogger') ? thumbnail : poster;

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
