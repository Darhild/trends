
import { items } from '../blogers.json';
import { changeImageSize } from './images';

export const mapTrends = ({ title, avatar, bg }: any) => ({
    desc: title,
    img: changeImageSize(bg),
    poster: avatar,
    videos: items[0].includes,
    stories: items[1].includes,
});
