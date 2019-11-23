import { camelizeKeys, decamelize } from 'humps';

export interface StoryRequestParams {
  authorId?: string;
  thematics?: string;
}
type ApiRequestParams = StoryRequestParams;

async function apiRequest(path: string, queryParams: ApiRequestParams = {}) {
  const data = new FormData();

  for (const k in queryParams) {
    data.append(decamelize(k), queryParams[k as keyof ApiRequestParams] as string);
  }

  const response = await fetch(path, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: data,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const json = await response.json();
  return camelizeKeys(json);
}

export async function getStory(id: string | number) {
  const url = `/stories/${id}`;
  const response = await fetch(url, {
    mode: 'cors'
  });

  return camelizeKeys(await response.json()) as Story;
}

export async function postStory(content: Blob, subject: string = 'default') {
  const url = '/stories/create';
  const data = new FormData();
  data.append('thematics', subject);
  data.append('content', content);

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: data
  });

  return camelizeKeys(await response.json()) as Story;
}

export async function getStories(queryParams?: StoryRequestParams) {
  const stories = await apiRequest('/stories', queryParams) as Story[];
  return stories.map((story) => ({
    ...story,
    isLoading: story.status !== 3,
  }));
}

export async function getComments(storyId: number) {
  const url = `/stories/${storyId}/comments`;

  const response = await fetch(url, {
    method: 'GET',
    mode: 'cors',
  });

  return camelizeKeys(await response.json()) as Promise<StoryComment[]>;
}

export async function postComment(user: User, content: string, storyId: number) {
  const url = `/stories/${storyId}/comments`;
  const data = new FormData();
  data.append('author_id', user.id.toString());
  data.append('content', content);

  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: data
  });

  return camelizeKeys(await response.json());
}
