import './index.css';
import React from 'react';

interface Props {
  avatarUrl: string;
  name: string;
  time?: string;
}

export const Author: React.FC<Props> = ({ avatarUrl, name, time = '12 мин назад' }) => {
  return (
    <div className='Author'>
      <img className='Author-Avatar' src={avatarUrl} alt={name} />
      <div className='Author-Info'>
        <div className='Author-Name'>{name}</div>
        <div className='Author-Time'>{time}</div>
      </div>
    </div>
  );
};
