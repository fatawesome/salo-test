import {
  $tickets, initSearch, fetchTicketsFx,
  $fetchIdError, $fetchTicketsError, $shownAmount, showMore
} from './index';
import { Ticket } from '../../types';
import { getSearchId, getTickets } from '../../api/search';
import { forward } from 'effector';

initSearch.use(getSearchId);
fetchTicketsFx.use(getTickets);

forward({
  from: initSearch.done.map(({ result }) => result),
  to: fetchTicketsFx
})

$fetchIdError
  .on(initSearch.fail, (_, { error }) => error)
  .reset(initSearch.done);

$fetchTicketsError
  .on(fetchTicketsFx.fail, (_, { error }) => error)
  .reset(fetchTicketsFx.done);

const updateTicketsStore = (state: Ticket[], data: Ticket[]) => {
  return state.concat(data);
}

$tickets.on(
  fetchTicketsFx.done,
  (tickets, {result}) => updateTicketsStore(tickets, result)
);

$shownAmount.on(
  showMore,
  (shown, payload) => shown + payload
);
