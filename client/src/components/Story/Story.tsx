import React from 'react';
import SmallCard from '../SmallCard/SmallCard';

interface StoryProps {
    title: string;
    thumbnail: string;
}

const Story = ({ thumbnail, title }: StoryProps) => (
    <SmallCard poster={thumbnail} desc={title}/>
);

export default Story;
