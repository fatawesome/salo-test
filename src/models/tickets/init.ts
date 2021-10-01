import {
  $tickets, initSearchFx, fetchTicketsFx,
  $fetchIdError, $fetchTicketsError, $searchId, $canFetchTickets, searchInitiated
} from './index';
import { Ticket } from '../../types';
import { getSearchId, getTickets } from '../../api/search';
import { forward } from 'effector';

initSearchFx.use(getSearchId);
fetchTicketsFx.use(getTickets);

forward({
  from: searchInitiated,
  to: initSearchFx
})

$searchId.on(
  initSearchFx.done,
  (_, {result}) => result
);

const updateTicketsStore = (state: Ticket[], data: Ticket[]) => {
  return state.concat(data);
}

$tickets.on(
  fetchTicketsFx.done,
  (tickets, {result}) => updateTicketsStore(tickets, result.tickets)
);

// TODO: было бы неплохо уметь запрещать делать запросы на уровне этого модуля.
$canFetchTickets.on(fetchTicketsFx.done, (_, {result}) => !result.stop);

forward({
  from: $searchId,
  to: fetchTicketsFx
});

$fetchIdError
  .on(initSearchFx.fail, (_, { error }) => error)
  .reset(initSearchFx.done);

$fetchTicketsError
  .on(fetchTicketsFx.fail, (_, { error }) => error)
  .reset(fetchTicketsFx.done);
