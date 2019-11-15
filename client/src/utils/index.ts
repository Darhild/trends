import { ListProps } from './../types/ListCardProps';
import { CardProps } from './../types/CardProps';

export function convertTime(duration: number) {
  let minutes = Math.floor(duration / 60);
  const seconds = duration - (minutes * 60);

  if (minutes > 60) {
    const hours = Math.floor(minutes / 60);
    minutes = minutes - (hours * 60);

    return `${hours}:${minutes}:${seconds}`;
  } else if (minutes > 0) {
    return `${minutes}:${seconds}`;
  }

  return `${seconds}`;
}

export function dateUtils(date: number) {
  return new Date(date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
}

export function excludeBanned(list: ListProps) {
  list.includes = list.includes.filter((card: CardProps) => {
    if (card.includes) {
      return !card.includes[0].banned;
    }

    return card;
  });

  return list;
}
