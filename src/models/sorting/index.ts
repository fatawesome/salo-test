import { createEvent, createStore } from 'effector';
import { Sort, SortType } from '../../types';
import { compareOnDuration, compareOnOptimality, compareOnPrice } from './helpers';

// TODO: дублируется сущность, надо бы сделать элегантней.
const priceIncreasing: Sort = {
  type: 'Самый дешевый',
  selected: true,
  comparator: compareOnPrice
};
const priceDecreasing: Sort = {
  type: 'Самый быстрый',
  selected: false,
  comparator: compareOnDuration
};
const optimal: Sort = {
  type: 'Оптимальный',
  selected: false,
  comparator: compareOnOptimality
};
const sorts = [priceIncreasing, priceDecreasing, optimal];

export const DEFAULT_SORT = priceIncreasing;

export const $sort = createStore<Sort>(DEFAULT_SORT);
export const $sortFn = $sort.map(sort => sort.comparator);
export const $sortStates = createStore<Sort[]>(sorts)
export const applySort = createEvent<SortType>();
export const resetSort = createEvent();
