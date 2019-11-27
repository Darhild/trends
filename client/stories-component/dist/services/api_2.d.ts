interface StoryRequestParams {
    authorId?: number;
    storyId?: number;
    tagName?: string;
    thematicName?: string;
    type?: string;
}
export declare function postStory(user: User, content: Blob): Promise<Object>;
export declare function getStories(queryParams?: StoryRequestParams): Promise<Story[]>;
export {};
