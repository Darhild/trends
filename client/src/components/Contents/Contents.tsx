import React from 'react';
import './Contents.scss';
import Carousel from '../Carousel/Carousel';
import Card, { CardProps } from '../Card/Card';

export interface ContentsProps {
    content: any;
}

const Contents = ({ content }: ContentsProps) => {
  const renderCarousel = (list: any) => {
    return (
      <Carousel
        title={list.title}
        margin="s"
        carouselId={list.carousel_id}
        key={list.carousel_id}
      >
      {list.includes.map((card: any) => {
        if (card.includes && card.includes[0].banned) {
          return null;
        }
        return <Card card={card} content_type={card.supertag || 'series'} key={card.content_id}/>;
      } )}
      </Carousel>
    );
  };

  return content.map((list: any) => {
    return list.content_type_name === 'carousel' ? renderCarousel(list) : <Card card={list} key={list.content_id} />;
  });
};

export default Contents;
