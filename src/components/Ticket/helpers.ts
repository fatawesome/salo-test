import { Segment } from '../../types';

export function getDepartureTime(segment: Segment): string {
  const date = new Date(segment.date);
  return dateToTimeString(date);
}

export function getArrivalTime(segment: Segment): string {
  const date = getArrivalDate(segment)
  return dateToTimeString(date);
}

export function getRouteTime(segment: Segment): RouteTime {
  const hours = Math.floor(segment.duration / 60);
  const minutes = segment.duration - hours * 60;
  return { hours, minutes };
}

interface RouteTime {
  hours: number,
  minutes: number
}

export function routeTimeToString({ hours, minutes }: RouteTime): string {
  return `${hours}ч ${minutes}м`;
}

export function showPrice(price: number): string {
  let result = ' Р';
  while (price) {
    result = ' ' + (price % 1000) + result;
    price = Math.floor(price / 1000);
  }
  return result.trimLeft();
}

function dateToTimeString(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

function getArrivalDate(segment: Segment): Date {
  const date = new Date(segment.date);
  date.setMinutes(date.getMinutes() + segment.duration);
  return date;
}
