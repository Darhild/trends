
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
