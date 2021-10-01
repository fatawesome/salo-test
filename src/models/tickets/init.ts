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
});

forward({
  from: initSearchFx.doneData,
  to: $searchId
})

forward({
  from: $searchId,
  to: fetchTicketsFx
});

const updateTicketsStore = (state: Ticket[], data: Ticket[]) => {
  return state.concat(data);
}

$tickets.on(
  fetchTicketsFx.doneData,
  (tickets, result) => updateTicketsStore(tickets, result.tickets)
);

// TODO: было бы неплохо уметь запрещать делать запросы на уровне этого модуля.
$canFetchTickets.on(
  fetchTicketsFx.doneData,
  (_, result) => !result.stop
);

$fetchIdError
  .on(initSearchFx.fail, (_, { error }) => error)
  .reset(initSearchFx.done);

$fetchTicketsError
  .on(fetchTicketsFx.fail, (_, { error }) => error)
  .reset(fetchTicketsFx.done);
