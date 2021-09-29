import { createEvent, createStore } from 'effector';
import { Sort, SortType, Ticket } from '../../types';

// TODO: лол это не будет работать
function compareOnDuration(a: Ticket, b: Ticket) {
  const getTicketDuration = (t: Ticket) =>
    t.segments.reduce((acc, s) => acc + s.duration, 0);
  return getTicketDuration(a) - getTicketDuration(b);
}

const priceIncreasing: Sort = {
  type: 'Самый дешевый',
  selected: true,
  comparator: (a, b) => a.price - b.price
};
const priceDecreasing: Sort = {
  type: 'Самый быстрый',
  selected: false,
  comparator: compareOnDuration
};
const optimal: Sort = {
  type: 'Оптимальный',
  selected: false,
  comparator: (a, b) => 0
};
const defaultSorts = [priceIncreasing, priceDecreasing, optimal];

export const $sort = createStore<Sort>(priceIncreasing);
export const $sortFn = $sort.map(sort => sort.comparator);
export const $sortStates = createStore<Sort[]>(defaultSorts)
export const applySort = createEvent<SortType>();
