import { allSettled, fork } from 'effector';
import { $tickets, fetchTicketsFx, initSearchFx, searchInitiated } from '../index';
import { testTickets } from '../../../stubs';
import { SearchId } from '../../../types';

describe('Tickets fetching module', () => {
  let initSearchHandler = () => 'FAKE_SEARCH_ID';
  let fetchTicketsHandler = (id: SearchId) => ({
    tickets: testTickets,
    stop: false
  });

  test('sets tickets after initiating search', async () => {
    const scope = fork({
      handlers: [
        [initSearchFx, initSearchHandler],
        [fetchTicketsFx, fetchTicketsHandler],
      ],
    });

    await allSettled(searchInitiated, { scope });
    expect(scope.getState($tickets)).toEqual(testTickets);
  })
})
