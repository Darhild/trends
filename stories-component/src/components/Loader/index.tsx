import './index.css';

import React from 'react';

interface Props {
  className?: string;
}

export const Loader: React.FC<Props> = ({ className = '' }) => {
  return (
    <div className={`Loader StoryCard-Loader ${className}`}>
      <div className="Loader-Spinner"></div>
    </div> 
  );
};
