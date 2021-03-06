import { createEvent, createStore } from 'effector';
import { Filter, FilterFn, FilterType, Ticket } from '../../types';
import { hasAmountOfStops } from './helpers';

export const $filters = createStore<FilterFn[]>([]);
export const $filtersFn = $filters.map(filters => {
  return filters.length
    ? (ticket: Ticket) => filters.some(filter => filter(ticket))
    : () => true;
});

export const toggleFilter = createEvent<FilterType>();
export const resetFilters = createEvent();

// TODO: refactor. Можно бахнуть красивую фабрику.
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
