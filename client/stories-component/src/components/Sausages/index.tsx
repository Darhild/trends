import './index.css';
import React from 'react';

// const episodesStub = 5;
// const activeStub = 0;
// const durationStub = 10;

interface Props {
  count: number;
  duration: number;
  activeItem: number;
  currentTime: number;
}

export const Sausages: React.FC<Props> = ({ count, activeItem, duration, currentTime }) => {
  const range = [...Array(count).keys()];
  const scale = { transform: `scaleX(${currentTime / duration})` };

  const isActive = (index: number) => {
    return activeItem === index;
  };

  const getProgressClasses = (index: number) => {
    const className = 'Sausages-Progress';

    return index < activeItem
      ? `${className} ${className}_passed`
      : className;
  };

  return (
    <div className='Sausages'>
      {range.map(i => (
        <div key={i} className={getProgressClasses(i)}>
          {isActive(i) && (
            <div className='Sausages-Passed' style={{ ...scale }} />
          )}
        </div>
      ))}
    </div>
  );
};
