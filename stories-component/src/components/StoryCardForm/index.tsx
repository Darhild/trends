import './index.css';
import React, { useCallback, useRef } from 'react';
import { useStore } from '../StoreProvider';
import { postStory, getStory } from '../../services/api';
import { StoryCard } from '../StoryCard';
import { Action } from 'services/reducer';

interface StoryCardFormProps {
  user: User;
  subject: string;
}

async function pollStory(id: string | number, dispatch: React.Dispatch<Action>) {
  const story = await getStory(id);

  if (story.status !== 3) {
    setTimeout(pollStory, 100, id, dispatch);
  } else {
    story.isLoading = false;
    dispatch({ type: 'updateStory', story });
  }
}

export const StoryCardForm: React.FC<StoryCardFormProps> = ({ user, subject }) => {
  const { dispatch } = useStore();

  const handleFileUpload = async (files: FileList | null) => {
    if (files && files.length > 0) {
      dispatch({ type: 'setUploading', isUploading: true });
      const story = await postStory(files[0], subject);
      story.isLoading = true;

      setTimeout(pollStory, 100, story.id, dispatch);

      dispatch({ type: 'appendStory', story });
      dispatch({ type: 'setUploading', isUploading: false });
    }
  };

  return (
    <label>
      <input className='StoryCardForm-FileInput' type='file' accept='video/*,image/*' onChange={(e) => handleFileUpload(e.target.files)} />
      <StoryCard previewUrl={user.picture} title='Добавить историю' />
    </label>
  );
};
