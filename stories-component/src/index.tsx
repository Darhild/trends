import './index.css';
import React, { FC } from 'react';

import { StoryViewer } from './components/StoryViewer';
import { StoryCards } from './components/StoryCards';
import { StoreProvider } from './components/StoreProvider';

interface Props {
  blogger?: string;
  subject?: string;
  canAdd: boolean;
  user: User | null;
  type?: string;
}

const Stories: FC<Props> = ({ blogger, canAdd, user, subject = 'default', type = 'custom' }) => {
  return (
    <StoreProvider>
      <StoryCards canAdd={canAdd} user={user} subject={subject} blogger={blogger} />
      <StoryViewer user={user}/>
    </StoreProvider>
  );
};


export default Stories
