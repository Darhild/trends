interface User {
  id: number;
  name: string;
  picture: string;
}

interface Author {
  avatarUrl: string;
  id: number;
  name: string;
}

interface Episode {
  id: number;
  duration: number;
  contentUrl: string;
}

interface Story {
  id: number;
  author: Author;
  contentUrl: string;
  defaultScore: number; // для чего это на фронте?
  previewUrl: string;
  tags: string[];
  title: string;
  thematicName: string; // и это для чего?
  type: string;
  episodes: Episode[];
  createdAt: string;
  status: number;
  isLoading: boolean;
}

interface StoryComment {
  content: string;
  createdAt: string;
  author: Author;
}
