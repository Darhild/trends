
import { items } from '../blogers.json';
import { changeImageSize } from './images';

export const mapTrends = ({ title, avatar, bg, id, source, comments_count }: any) => ({
    desc: title,
    img: changeImageSize(bg),
    poster: avatar,
    id,
    source,
    collection: [],
    commentsCount: comments_count,
    stories: items[1].includes,
});

export const mapCommented = ({ title, thumbnail, id, duration, comment, comments_count }: any) => ({
    title,
    content_id: id,
    duration,
    img: thumbnail,
    commentsCount: comments_count,
    lastComment: comment,
});
