import { createEvent, createStore } from 'effector';
import { Ticket } from '../../types';

export type SortingType = 'price_dec' | 'price_inc' | 'optimal';

export const $sort = createStore<SortingType>('price_dec');

// TODO: можно запариться насчет DRY, но имхо это будет premature.
export const $sortFn = $sort.map(sort => {
  switch (sort) {
    case 'price_dec':
      return (a: Ticket, b: Ticket) => a.price - b.price;
    case 'price_inc':
      return (a: Ticket, b: Ticket) => b.price - a.price;
    case 'optimal':
      // TODO: придумать формулу, пока пусть будет identity для работоспособности
      return (a: Ticket, b: Ticket) => 0;
  }
});

export const applySort = createEvent<SortingType>();
