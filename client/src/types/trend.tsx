import { Vod } from './FeedItem';
export default interface Trend {
    img: string;
    poster: string;
    desc: string;
    icon?: string;
    id: string;
    source: string;
    collection: Vod[];
    commentsCount: number;
    stories: Array<{
        title: string;
        thumbnail: string;
    }>;
}
