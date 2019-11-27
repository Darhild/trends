import './index.css';
import React from 'react';
interface StoryProps {
    previewUrl: string;
    iconUrl?: string;
    title: string;
    onClick?(): void;
    isLoading?: boolean;
}
export declare const StoryCard: React.FC<StoryProps>;
export {};
