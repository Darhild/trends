import { Vod } from './FeedItem';
export default interface Trend {
    img: string;
    poster: string;
    desc: string;
    icon?: string;
    videos?: Vod[];
    stories: Array<{
        title: string;
        thumbnail: string;
    }>;
}
