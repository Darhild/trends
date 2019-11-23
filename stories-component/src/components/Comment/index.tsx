import './index.css';
import React from 'react';

export const Comment: React.FC<StoryComment> = ({ content, author }) => {
  return (
    <div className='Comment'>
      <div className='Comment-Row'>
        <img className='Comment-Avatar' src={author.avatarUrl} alt={author.name} />
        <div className='Comment-Name'>{author.name}</div>
        <div className='Comment-Date'>12 окт</div>
      </div>
      <div className='Comment-Message'>
        {content}
      </div>
      <div className='Comment-Controls'>
        <div className='Comments-PhotoAnswer'>Ответить</div>
        <div className='Comments-TextAnswer'>Написать ответ</div>
      </div>
    </div>
  );
};
