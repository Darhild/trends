import { Reducer } from 'react';

export type Action =
  { type: 'openStory'; activeStoryId: number } |
  { type: 'closeViewer' } |
  { type: 'nextStory' } |
  { type: 'prevStory' } |
  { type: 'setStories'; stories: Story[] } |
  { type: 'setComments'; comments: StoryComment[] } |
  { type: 'openComments' } |
  { type: 'closeComments' } |
  { type: 'appendComment', newComment: StoryComment } |
  { type: 'appendStory', story: Story } |
  { type: 'updateStory', story: Story } |
  { type: 'setUploading', isUploading: boolean } |
  { type: 'setStories'; stories: Story[] };

export interface State {
  activeStory: Story | null;
  comments: StoryComment[];
  commentsVisible: boolean;
  isUploading: boolean;
  newComment: StoryComment | undefined;
  stories: Story[];
}

export const initialState: State = {
  activeStory: null,
  comments: [],
  commentsVisible: false,
  isUploading: false,
  newComment: undefined,
  stories: [],
};

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'setUploading': {
      return { ...state, isUploading: action.isUploading };
    }

    case 'setStories': {
      return { ...state, stories: action.stories };
    }

    case 'appendStory': {
      return { ...state, stories: [action.story, ...state.stories] };
    }

    case 'updateStory': {
      const stories = [...state.stories];
      const idx = stories.findIndex((story) => story.id === action.story.id);
      if (idx >= 0) {
        stories[idx] = action.story;
      } else {
        stories.push(action.story);
      }
      return { ...state, stories };
    }

    case 'openStory': {
      const activeStory = state.stories.find(({ id }) => id === action.activeStoryId) as Story;

      return { ...state, viewerVisible: true, activeStory, commentsVisible: false };
    }

    case 'nextStory': {
      const { activeStory, stories } = state;
      const nextStoryIndex = stories.indexOf(activeStory!) + 1;
      const nextStory = stories[nextStoryIndex] || null;
      const viewerVisible = !!nextStory;

      return { ...state, viewerVisible, activeStory: nextStory, commentsVisible: false };
    }

    case 'prevStory': {
      const { activeStory, stories } = state;
      const prevStoryIndex = stories.indexOf(activeStory!) - 1;
      const prevStory = stories[prevStoryIndex] || null;
      const viewerVisible = !!prevStory;

      return { ...state, viewerVisible, activeStory: prevStory, commentsVisible: false };
    }

    case 'closeViewer': {
      return { ...state, viewerVisible: false, activeStory: null, commentsVisible: false };
    }

    case 'setComments': {
      return { ...state, comments: action.comments };
    }

    case 'openComments': {
      return { ...state, commentsVisible: true };
    }

    case 'closeComments': {
      return { ...state, commentsVisible: false };
    }

    case 'appendComment': {
      return { ...state, comments: [...state.comments, action.newComment] };
    }

    default:
      return state;
  }
};
