import { Vod } from '../types/FeedItem';

const formatTime = (time: number) => time < 10 ? `0${time}` : `${time}`;

export function convertTime(duration: number) {
    const times: number[] = [
        Math.floor(duration / 3600),
        Math.floor(duration % (3600) / 60),
        duration % 60,
    ];

    if (!times[0]) {
        times.shift();
    }

    return times.map(formatTime).join(':');
}

export function dateUtils(date: number) {
    return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function excludeBannedCards(cards: Vod[]) {
    return cards.filter((card: Vod) => {
        if (card.includes) {
            return !card.includes[0].banned;
        }

        return !card.banned;
    });
}

