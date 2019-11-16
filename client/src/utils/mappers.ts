import { items } from '../blogers.json';

export const mapTrends = ({ title, avatar, bg }: any) => ({
    desc: title,
    img: bg,
    poster: avatar,
    videos: items[0].includes,
    stories: items[1].includes,
});
