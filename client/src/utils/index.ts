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

interface Dictionary {
    one: string;
    few: string;
    many: string;
}

export function getPlural(count: number, { one, few, many }: Dictionary) {
    const num = Math.abs(count);
    let remainder = num % 100;

    if (remainder >= 5 && remainder <= 20) {
      return many;
    }

    remainder = num % 10;
    if (remainder === 1) {
      return one;
    }
    if (remainder >= 2 && remainder <= 4) {
      return few;
    }

    return many;
}

export function excludeBannedCards(cards: Vod[]) {
    return cards.filter((card: Vod) => {
        if (card.includes) {
            return !card.includes[0].banned;
        }

        return !card.banned;
    });
}

