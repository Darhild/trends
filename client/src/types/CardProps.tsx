export interface CardBanned {
    banned?: boolean;
}

export interface CardCommonProps extends CardBanned {
    content_id: string;
    className?: string;
    supertag?: string;
    includes?: CardBanned[];
}

export interface CardThumbProps {
    onto_poster: string;
    thumbnail: string;
}

export interface CardDetailsProps {
    content_type: string;
    duration: number;
    rating_kp?: number;
    percentage_score?: number;
}

export interface CardContentProps {
    content_type: string;
    title: string;
    computed_title?: string;
    release_date_ut?: number;
    release_year?: number;
    genres?: string[];
}

export type CardProps = CardCommonProps & CardThumbProps & CardDetailsProps & CardContentProps;
