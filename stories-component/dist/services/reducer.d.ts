import { Reducer } from 'react';
export declare type Action = {
    type: 'openStory';
    activeStoryId: number;
} | {
    type: 'closeViewer';
} | {
    type: 'nextStory';
} | {
    type: 'prevStory';
} | {
    type: 'setStories';
    stories: Story[];
} | {
    type: 'setComments';
    comments: StoryComment[];
} | {
    type: 'openComments';
} | {
    type: 'closeComments';
} | {
    type: 'appendComment';
    newComment: StoryComment;
} | {
    type: 'appendStory';
    story: Story;
} | {
    type: 'updateStory';
    story: Story;
} | {
    type: 'setUploading';
    isUploading: boolean;
} | {
    type: 'setStories';
    stories: Story[];
};
export interface State {
    activeStory: Story | null;
    comments: StoryComment[];
    commentsVisible: boolean;
    isUploading: boolean;
    newComment: StoryComment | undefined;
    stories: Story[];
}
export declare const initialState: State;
export declare const reducer: Reducer<State, Action>;
