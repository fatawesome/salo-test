import { combine, createEvent, createStore } from 'effector';
import { $canFetchTickets, $tickets } from '../tickets';

// Env variable can be used for multiple environments.
export const AMOUNT_TO_SHOW = parseInt(process.env.TICKETS_SHOWN_AMOUNT || '5');

export const $shownAmount = createStore<number>(AMOUNT_TO_SHOW);
export const showMore = createEvent<number>();
export const resetShownAmount = createEvent();

export const $fetchingRequired = combine($shownAmount, $tickets,
  (shownAmount, tickets) => shownAmount > tickets.length
)

export const $canShowMore = combine(
  $fetchingRequired, $canFetchTickets,
  (fetchingRequired, canFetchTickets) =>
    !fetchingRequired || (fetchingRequired && canFetchTickets)
)
