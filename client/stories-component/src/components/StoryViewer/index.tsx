import './index.css';
import React, { useState, useEffect } from 'react';

import { useStore } from '../StoreProvider';
import { Story } from '../Story';

const SWIPE_TRESHOLD = 50;

interface Props {
  user: User | null;
}

export const StoryViewer: React.FC<Props> = ({user}) => {
  const { state, dispatch } = useStore();
  const { activeStory, stories } = state;
  const activeStoryIndex = stories.findIndex(story => activeStory?.id === story.id);

  const [selfState, setState] = useState<any>({
    isMoving: false,
    touchOffset: 0
  });

  useEffect(() => {
    setState({ ...selfState, sliderOffset: -100 * activeStoryIndex });
  }, [activeStoryIndex]);


  if (!activeStory) return null;

  const handleNextStory = () => dispatch({ type: 'nextStory' });
  const handleClose = () => dispatch({ type: 'closeViewer' });

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setState({ ...selfState,
      isMoving: true,
      touchStart: e.touches[0].clientX
    });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchOffset = selfState.touchStart - e.touches[0].clientX;

    if (activeStoryIndex <= 0 && touchOffset <= 0) return;
    if (activeStoryIndex + 1 >= stories.length && touchOffset >= 0) return;

    setState({ ...selfState, touchOffset });
  };

  const handleTouchEnd = () => {
    const { touchOffset } = selfState;
    if (Math.abs(touchOffset) > SWIPE_TRESHOLD) {
      touchOffset > 0
        ? dispatch({ type: 'nextStory' })
        : dispatch({ type: 'prevStory' });
    }

    setState({ ...selfState,
      isMoving: false,
      touchStart: null,
      touchOffset: 0
    });
  };

  const transform = `
    translateX(calc(
      ${selfState.sliderOffset}% + ${-selfState.touchOffset}px
    ))
  `;

  return (
    <div className='StoryViewer'>
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`StoryViewer-Stories ${selfState.isMoving ? 'StoryViewer-Stories_moving' : '' }`}
        style={{ transform }}
      >
        {state.stories.map(story => (
          <Story
            key={story.id}
            story={story}
            onEnd={handleNextStory}
            onClose={handleClose}
            isActive={story.id === activeStory.id}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};
