import { CardProps } from './CardProps';

export interface ListProps {
    title: string;
    carousel_id: string;
    content_type_name: string;
    content_id: string;
    includes: CardProps[];
    card?: CardProps;
}

export type ListCardProps = ListProps & CardProps;
