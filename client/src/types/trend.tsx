export default interface Trend {
    img: string;
    poster: string;
    desc: string;
    icon?: string;
    videos: TrendVideo[];
    stories: Array<{
        title: string;
        thumbnail: string;
    }>;
}

export interface TrendVideo {
    content_id: string;
    title: string;
    duration: number;
    release_date_ut: number;
    thumbnail: string;
}
