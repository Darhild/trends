import './index.css';
import React, { useEffect } from 'react';

import { useStore } from '../StoreProvider';

import { StoryCardForm } from '../StoryCardForm';
import { StoryCard } from '../StoryCard';

import { getStories, StoryRequestParams } from '../../services/api';
import { Loader } from 'components/Loader';

interface Props {
  blogger?: string;
  canAdd: boolean;
  user: User | null;
  subject: string;
}

export const StoryCards: React.FC<Props> = ({ blogger, canAdd, user, subject }) => {
  const { dispatch, state } = useStore();
  const { stories } = state;

  useEffect(() => {
    async function loadStories() {
      const filter: StoryRequestParams = {
        thematics: subject,
      };
      if (blogger) {
        filter.authorId = blogger;
      }

      const res = await getStories(filter);

      dispatch({ type: 'setStories', stories: res });
    }

    loadStories();
  }, []);

  const handleClick = (story: Story) => () => {
    if (!story.isLoading) {
      dispatch({ type: 'openStory', activeStoryId: story.id });
    }
  };

  return (
    <main className='StoryCards'>
      { state.isUploading && <Loader className='StoryCards-Loader' /> }
      { ((stories && stories.length > 0) || canAdd) &&
        (
          <div className='StoryCards-Scroll'>
            {canAdd && user && (
              <StoryCardForm subject={subject} user={user} />
            )}

            {stories.map((story) => (
              <StoryCard key={story.id} onClick={handleClick(story)} {...story} title={story.author.name} iconUrl={story.author.avatarUrl} />
            ))}
          </div>
        )
      }
    </main>
  );
};
