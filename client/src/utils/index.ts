import { Vod } from '../types/FeedItem';

const formatTime = (time: number) => time < 10 ? `0${time}` : `${time}`;

const hour = 3600;
const minute = 60;

export function convertTime(duration: number) {
    const times: number[] = [
        Math.floor(duration / hour),
        Math.floor(duration % hour / minute),
        duration % minute,
    ];

    if (!times[0]) {
        times.shift();
    }

    return times.map(formatTime).join(':');
}

export function dateUtils(date: number) {
    return new Date(date * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function commentUtils(count: number) {
    if (count % 100 > 10 && count % 100 < 15) {
            return 'комментариев';
    }

    switch (count % 10) {
        case 1:
            return 'комментарий';
        case 2:
        case 3:
        case 4:
            return 'комментария';
        default:
            return 'комментариев';
    }
}

export function excludeBannedCards(cards: Vod[]) {
    return cards.filter((card: Vod) => {
        if (card.includes) {
            return !card.includes[0].banned;
        }

        return !card.banned;
    });
}

