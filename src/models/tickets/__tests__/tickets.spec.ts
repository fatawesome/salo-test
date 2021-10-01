import { allSettled, fork } from 'effector';
import { $tickets, fetchTicketsFx, initSearchFx, searchInitiated } from '../index';
import { testTickets } from '../../../stubs';

describe('Tickets fetching module', () => {
  test('sets tickets after initiating search', async () => {
    let initSearchHandler = () => 'FAKE_SEARCH_ID';
    let fetchTicketsHandler = () => ({
      tickets: testTickets,
      stop: false
    });

    const scope = fork({
      handlers: new Map()
        .set(initSearchFx, initSearchHandler)
        .set(fetchTicketsFx, fetchTicketsHandler),
    });

    await allSettled(searchInitiated, { scope });
    expect(scope.getState($tickets)).toEqual(testTickets);
  })
})
