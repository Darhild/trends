import './index.css';
import React from 'react';
import { Loader } from 'components/Loader';

interface StoryProps {
  previewUrl: string;
  iconUrl?: string;
  title: string;
  onClick?(): void;
  isLoading?: boolean;
}

export const StoryCard: React.FC<StoryProps> = ({ onClick, title, previewUrl, iconUrl, isLoading }) => {
  const style = {
    ...previewUrl && { backgroundImage: `url(${previewUrl})` },
  };

  const iconStyle = {
    ...iconUrl && {
      backgroundImage: `url(${iconUrl})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat'
    }
  };

  return (
    <div>
      <div onClick={onClick} className='StoryCard' style={style}>
        {isLoading && <Loader className="StoryCard-Loader" />} 
        <div className='StoryCard-Type StoryCard-Type_Video' style={iconStyle} />
        <div className='StoryCard-Name'>
          {title}
        </div>
      </div>
    </div>
  );
};
