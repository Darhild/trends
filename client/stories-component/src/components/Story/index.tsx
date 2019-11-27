import './index.css';
import React, { useState, SyntheticEvent, useEffect, useCallback } from 'react';

import { Author } from '../Author';
import { Sausages } from '../Sausages';
import { Comments } from '../Comments';

interface Props {
  story: Story;
  isActive: boolean;
  user: User | null;

  onClose(): void;
  onEnd(): void;

}


export const Story = ({ onClose, story, onEnd, isActive, user }: Props) => {
  const { episodes, author } = story;

  const [episodeIndex, setEpisodeIndex] = useState(0);
  const [videoElement, setVideoElement] = useState<HTMLVideoElement>();
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [canPlay, setCanPlay] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(true);

  const resetState = () => {
    setEpisodeIndex(0);
    setVideoElement(undefined);
    setVideoDuration(0);
    setCurrentTime(0);
    setCanPlay(false);
  };

  const episode = episodes[episodeIndex];

  const videoRef = useCallback((node: HTMLVideoElement) => {
    setVideoElement(node);
  }, []);

  useEffect(() => {
    if (!videoElement) return;

    const intervalCallback = () => setCurrentTime(videoElement.currentTime);
    const interval = setInterval(intervalCallback, 10);

    return () => {
      resetState();
      clearInterval(interval);
    };
  }, [videoElement]);

  const handleEpisodeChange = (action: 'prev' | 'next') => (e: React.MouseEvent | SyntheticEvent<HTMLVideoElement, Event>) => {
    e.stopPropagation();

    const nextIndex = action === 'prev'
      ? episodeIndex - 1
      : episodeIndex + 1;

    if (nextIndex < 0) return e.preventDefault();
    if (nextIndex >= episodes.length) return onEnd(); //onNextStory();

    setEpisodeIndex(nextIndex);
  };

  const handlePrevEpisode = handleEpisodeChange('prev');
  const handleNextEpisode = handleEpisodeChange('next');

  const handleMetaDataLoad = (event: SyntheticEvent<HTMLVideoElement, Event>) => {
    setVideoDuration(event.currentTarget.duration);
  };

  const handleCanPlay = () => setCanPlay(true);

  return (
    <div className='Story'>
      <div className='Story-Togglers'>
        <div className='Story-Toggler Story-Toggler_left' onClick={handlePrevEpisode} />
        <div className='Story-Toggler Story-Toggler_right' onClick={handleNextEpisode} />
      </div>
      <div className='Story-Close' onClick={onClose} />

      <div className='Story-Info'><Author {...author} /></div>
      <div className='Story-Progress'>
        <Sausages
          currentTime={currentTime}
          count={episodes.length}
          duration={videoDuration}
          activeItem={episodeIndex}
        />
      </div>

      <img className='Story-Media' src={story.previewUrl} />
      {isActive && (
        <>
          <video
            style={{ backgroundColor: 'black' }}
            className={`
              Story-Media
              Story-Media_type_video
              ${canPlay ? 'Story-Media_state_ready' : ''}
            `}
            id='video'
            autoPlay={isActive}
            playsInline
            ref={videoRef}
            src={episode.contentUrl}
            onEnded={handleNextEpisode}
            onCanPlay={handleCanPlay}
            onLoadedMetadata={handleMetaDataLoad}
          />
          <Comments storyId={story.id} user={user}/>
        </>
      )}
    </div>
  );
};
