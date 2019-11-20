import React from 'react';
import './TitleWrapper.scss';

interface TitleWrapperProps {
    children: React.ReactNode[];
}

const TitleWrapper = ({ children }: TitleWrapperProps) => (
    <div className="TitleWrapper">
        {
            React.Children.map(children, (child, num) => (
                <div key={num} className="TitleWrapper-Item">{child}</div>
            ))
        }
    </div>
);

export default TitleWrapper;
