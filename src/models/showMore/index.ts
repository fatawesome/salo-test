import { combine, createEvent, createStore } from 'effector';
import { $canFetchTickets, $tickets } from '../tickets';

export const AMOUNT_TO_SHOW = 100;

export const $shownAmount = createStore<number>(AMOUNT_TO_SHOW);
export const showMore = createEvent<number>();

export const $fetchingRequired = combine($shownAmount, $tickets,
  (shownAmount, tickets) => shownAmount > tickets.length
)

export const $canShowMore = combine(
  $fetchingRequired, $canFetchTickets,
  (fetchingRequired, canFetchTickets) =>
    !fetchingRequired || (fetchingRequired && canFetchTickets)
)
