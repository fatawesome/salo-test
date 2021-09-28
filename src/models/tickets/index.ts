import { combine, createEffect, createStore } from 'effector';
import { SearchId, Ticket } from '../../types';
import { $filtersFn } from '../filter';
import { TicketsResponse } from '../../api/search';
import { $sortFn } from '../sorting';

export const $searchId = createStore<SearchId>('');
export const $tickets = createStore<Ticket[]>([]);
export const $canFetchTickets = createStore<boolean>(true);

export const initSearch = createEffect<void, SearchId, Error>();
export const fetchTicketsFx = createEffect<SearchId, TicketsResponse, Error>();

export const $fetchIdError = createStore<Error | null>(null);
export const $fetchTicketsError = createStore<Error | null>(null);
export const $fetchError = combine(
  $fetchIdError, $fetchTicketsError,
  (idError, ticketsError) => { return idError || ticketsError; }
);

// First filter, then sort, cz filter - O(n), and sort - O(nlogn).
export const $filteredAndSortedTickets = combine(
  $tickets,
  $filtersFn,
  $sortFn,
  (list, filterFn, sortFn) => list.filter(filterFn).sort(sortFn)
);

export const $ticketGetStatus = combine({
  loading: initSearch.pending || fetchTicketsFx.pending,
  error: $fetchError,
  tickets: $filteredAndSortedTickets
});
