import React from 'react';
import './List.scss';
import Carousel from '../Carousel/Carousel';
import Card, { CardProps } from '../Card/Card';

export interface ListProps {
    cards: CardProps[];
    content: string;
    title: string;
    carouselId: string;
}

const List = ({ cards, content, title, carouselId }: ListProps) =>
  (
    <Carousel title={title} margin="s" carouselId={carouselId} >
      {cards.map((card) => <Card card={card} content={content}/>)}
    </Carousel>
  );

export default List;
