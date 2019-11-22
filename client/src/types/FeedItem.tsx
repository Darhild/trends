export interface Vod {
    content_type_name: 'vod-episode';
    title: string;
    computed_title?: string;
    content_id: string;
    release_date_ut?: number;
    release_year?: number;
    genres?: string[];
    duration: number;
    rating_kp?: number;
    percentage_score?: number;
    banned?: boolean;
    onto_poster?: string;
    thumbnail: string;
    supertag?: string;
    includes?: Includes[];
}

interface Includes {
    banned: boolean;
}

export interface Carousel {
    content_type_name: 'carousel';
    title: string;
    carousel_id: string;
    content_id: string;
    includes: Vod[];
}

export type FeedItem = Vod | Carousel;
