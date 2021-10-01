import { Segment, Ticket } from '../../../types';

// Подсмотрел логику на проде
export const hasAmountOfStops = (n: number) => (ticket: Ticket): boolean => {
  return ticket.segments.some(segmentHasAmountOfStops(n));
}
const segmentHasAmountOfStops = (n: number) => (segment: Segment) => {
  return segment.stops.length === n;
}
