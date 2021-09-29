import { createEvent, createStore } from 'effector';
import { Filter, FilterFn, FilterType, Segment, Ticket } from '../../types';

const hasAmountOfStops = (n: number) => (ticket: Ticket) => {
  return ticket.segments.every(segmentHasAmountOfStops(n));
}
const segmentHasAmountOfStops = (n: number) => (segment: Segment) => {
  return segment.stops.length === n;
}

export const $filters = createStore<FilterFn[]>([]);
export const $filtersFn = $filters.map(filters => {
  return filters.length
    ? (ticket: Ticket) => filters.some(filter => filter(ticket))
    : () => true;
});

export const toggleFilter = createEvent<FilterType>();

// TODO: refactor. Можно бахнуть красивую фабрику, но мне лень.
export const $filterStates = createStore<Filter[]>([
  { type: 'Без пересадок', selected: false,
    fn: hasAmountOfStops(0)
  },
  { type: '1 пересадка', selected: false,
    fn: hasAmountOfStops(1)
  },
  { type: '2 пересадки', selected: false,
    fn: hasAmountOfStops(2)
  },
  { type: '3 пересадки', selected: false,
    fn: hasAmountOfStops(3)
  },
]);
