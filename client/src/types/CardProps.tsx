export interface CardProps {
    title: string;
    computed_title: string;
    content_id: string;
    supertag: string;
    content_type?: string;
    release_date_ut: number;
    genres: string[];
    rating_kp: number;
    percentage_score: number;
    duration: number;
    poster: string;
    thumbnail: string;
    includes?: any;
}

export interface CardThumbProps {
    poster: string;
    thumbnail: string;
}

export interface CardDetailsProps {
    rating_kp: number;
    percentage_score: number;
    duration: number;
    content_type: string;
}
