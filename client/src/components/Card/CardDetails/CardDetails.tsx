import React from 'react';
import { convertTime } from './../../../utils';
import { CardDetailsProps } from './../../../types/CardProps';

const CardDetails = ({ duration, rating_kp, percentage_score, content_type }: CardDetailsProps) => {
  const blogersDetails = (
    <div className="Card-Duration">
        {convertTime(duration)}
    </div>
  );

  const seriesDetails = (
    <>
      <div className="Card-Rating">
          {Math.round(rating_kp * 10) / 10 || null}
      </div>
      <div className="Card-Score">
          {percentage_score && `${percentage_score}%`}
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
