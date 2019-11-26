import React from 'react';
import Carousel from '../Carousel/Carousel';
import Card from './../Card/Card';

interface EmptyCardsProps {
    carouselNumber: number;
    cardsNumber: number;
    cardSize?: string;
}

const fillArray = (num: number): number[] => {
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(i);
    }

    return arr;
};

const EmptyCards = ({ carouselNumber, cardsNumber, cardSize }: EmptyCardsProps ) => {
    const carouselArr = fillArray(carouselNumber);
    const cardsArr = fillArray(cardsNumber);

    return (
        <>
            {
                carouselArr.map((item, index) => (
                    <Carousel key={index} margin="s" canBeHidden={false}>
                        {
                            cardsArr.map((el, i) => <Card key={i} size={cardSize} />)
                        }
                    </Carousel>
                ))
            }
        </>
    );
};

export default EmptyCards;

