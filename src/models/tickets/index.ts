import { combine, createEffect, createEvent, createStore } from 'effector';
import { SearchId, Ticket } from '../../types';
import { $filtersFn } from '../filter';

export const $tickets = createStore<Ticket[]>([]);

export const initSearch = createEffect<void, SearchId, Error>();
export const fetchTicketsFx = createEffect<SearchId, Ticket[], Error>();

export const $fetchIdError = createStore<Error | null>(null);
export const $fetchTicketsError = createStore<Error | null>(null);
export const $fetchError = combine(
  $fetchIdError, $fetchTicketsError,
  (idError, ticketsError) => { return idError || ticketsError; }
);

export const $filteredTickets = combine(
  $tickets,
  $filtersFn,
  (list, fn) => list.filter(fn)
);

export const $ticketGetStatus = combine({
  loading: initSearch.pending || fetchTicketsFx.pending,
  error: $fetchError,
  tickets: $filteredTickets
});


export const AMOUNT_TO_SHOW = 5;
export const $shownAmount = createStore<number>(0);
export const showMore = createEvent<number>();

