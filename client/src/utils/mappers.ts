
import { items } from '../blogers.json';
import { changeImageSize } from './images';

export const mapTrends = ({ title, avatar, bg, thumbnail, id, source, comments_count }: any) => ({
    desc: title,
    img: changeImageSize(thumbnail || bg),
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

export const filterChannels = ({ meta, weight }: any) => (weight && !meta.project_alias);

export const mapChannels = ({ channel_id, title, channel_category }: any) => ({
    channelId: channel_id,
    title,
    channelCategory: channel_category,
});
