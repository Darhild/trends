export interface StoryRequestParams {
    authorId?: string;
    thematics?: string;
}
export declare function getStory(id: string | number): Promise<Story>;
export declare function postStory(content: Blob, subject?: string): Promise<Story>;
export declare function getStories(queryParams?: StoryRequestParams): Promise<{
    isLoading: boolean;
    id: number;
    author: Author;
    contentUrl: string;
    defaultScore: number;
    previewUrl: string;
    tags: string[];
    title: string;
    thematicName: string;
    type: string;
    episodes: Episode[];
    createdAt: string;
    status: number;
}[]>;
export declare function getComments(storyId: number): Promise<StoryComment[]>;
export declare function postComment(user: User, content: string, storyId: number): Promise<Object>;
