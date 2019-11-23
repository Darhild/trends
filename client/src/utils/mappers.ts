
import { items } from '../blogers.json';
import { changeImageSize } from './images';

export const mapTrends = ({ title, avatar, bg, id, source }: any) => ({
    desc: title,
    img: changeImageSize(bg),
    poster: avatar,
    id,
    source,
    collection: [],
    collectionLength: 0,
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
