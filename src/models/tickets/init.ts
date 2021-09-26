import {
  $tickets, initSearch, fetchTicketsFx,
  $fetchIdError, $fetchTicketsError, $searchId
} from './index';
import { Ticket } from '../../types';
import { getSearchId, getTickets } from '../../api/search';
import { forward } from 'effector';

initSearch.use(getSearchId);
fetchTicketsFx.use(getTickets);

$searchId.on(
  initSearch.done,
  (_, {result}) => result
);

const updateTicketsStore = (state: Ticket[], data: Ticket[]) => {
  return state.concat(data);
}
$tickets.on(
  fetchTicketsFx.done,
  (tickets, {result}) => updateTicketsStore(tickets, result)
);

forward({
  from: $searchId,
  to: fetchTicketsFx
});

$fetchIdError
  .on(initSearch.fail, (_, { error }) => error)
  .reset(initSearch.done);

$fetchTicketsError
  .on(fetchTicketsFx.fail, (_, { error }) => error)
  .reset(fetchTicketsFx.done);
