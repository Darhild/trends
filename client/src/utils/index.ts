import { CardProps } from './../types/CardProps';

const formatTime = (time: number) => time < 10 ? `0${time}` : `${time}`;

export function convertTime(duration: number) {
  let minutes = Math.floor(duration / 60);
  const seconds = duration - (minutes * 60);

  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);

    return `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
  } else if (minutes > 0) {
    return `${formatTime(minutes)}:${formatTime(seconds)}`;
  }

  return `${formatTime(seconds)}`;
}

export function dateUtils(date: number) {
  return new Date(date * 1000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function excludeBannedCards(cards: CardProps[]) {
  return cards.filter((card: CardProps) => {
    if (card.includes) {
      return !card.includes[0].banned;
    }

    return !card.banned;
  });
}

