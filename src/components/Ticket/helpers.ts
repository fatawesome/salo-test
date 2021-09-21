import { Segment } from '../../models';

export function getDepartureTime(segment: Segment): string {
  const date = new Date(segment.date);
  return dateToTimeString(date);
}

export function getArrivalTime(segment: Segment): string {
  const date = getArrivalDate(segment)
  return dateToTimeString(date);
}

export function getRouteTime(segment: Segment): string {
  const hours = Math.floor(segment.duration / 60);
  const minutes = segment.duration - hours * 60;
  return `${hours}ч ${minutes}м`;
}

function dateToTimeString(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()}`;
}

function getArrivalDate(segment: Segment): Date {
  const date = new Date(segment.date);
  date.setMinutes(date.getMinutes() + segment.duration);
  return date;
}
