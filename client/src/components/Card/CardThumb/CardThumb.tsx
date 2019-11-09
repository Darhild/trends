import React from 'react';
import { CardProps } from '../../Card/Card';
import CardDetails from './../CardDetails/CardDetails';

const CardThumb = ({ card, content_type }: CardProps) => {
    const poster = card.onto_poster;
    const thumbnail = card.thumbnail;
    const cardPoster  = ( <img src={card.onto_poster} className="Card-Poster" alt="" /> );
    const img = (content_type === 'vod' || content_type === 'blogger') ? thumbnail : poster;

    return (
        <div className="Card-Thumb" style={{ backgroundImage: `url(${img})` }}>
            {content_type === 'vod' && cardPoster}
            <CardDetails card={card} content_type={content_type}/>
        </div>
    );
  };

export default CardThumb;
