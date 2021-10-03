import { Ticket } from '../types';
import { fork } from 'effector';
import { fetchTicketsFx, initSearchFx } from '../models/tickets';

export function forkWithSearchHandlers(
  initSearchHandler: jest.Mock<string, []>,
  fetchTicketsHandler: jest.Mock<{ tickets: Ticket[]; stop: boolean; }, []>
) {
  return fork({
    handlers: new Map()
      .set(initSearchFx, initSearchHandler)
      .set(fetchTicketsFx, fetchTicketsHandler)
  })
}
