import React from 'react';
import { convertTime } from './../../../utils';
import { CardProps } from '../../Card/Card';

const CardDetails = ({ card, content_type }: CardProps) => {
  const blogersDetails = (
    <div className="Card-Duration">
        {convertTime(card.duration)}
    </div>
  );

  const seriesDetails = (
    <>
      <div className="Card-Rating">
          {Math.round(card.rating_kp * 10) / 10 || null}
      </div>
      <div className="Card-Score">
          {card.percentage_score && `${card.percentage_score}%`}
      </div>
    </>
  );

  return (
    <div className="Card-Details">
      { content_type === 'blogger' ? blogersDetails : seriesDetails }
    </div>
  );
};

export default CardDetails;
