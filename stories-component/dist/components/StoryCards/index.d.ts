import './index.css';
import React from 'react';
interface Props {
    blogger?: string;
    canAdd: boolean;
    user: User | null;
    subject: string;
}
export declare const StoryCards: React.FC<Props>;
export {};
