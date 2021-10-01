import { testTickets } from '../../stubs';
import { allSettled, fork } from 'effector';
import { $tickets, fetchTicketsFx, initSearchFx, searchInitiated } from './index';

import './init';

describe('Search logic', () => {
  let initSearchHandler = jest.fn(() => 'FAKE_SEARCH_ID');
  let fetchTicketsHandler = jest.fn(
    () => ({
      tickets: testTickets,
      stop: false
    })
  );

  beforeEach(() => {
    initSearchHandler.mockClear();
    fetchTicketsHandler.mockClear();
  });

  describe('Tickets fetching', () => {
    test('set tickets after initiating search', async () => {
      const scope = fork({
        handlers: new Map()
          .set(initSearchFx, initSearchHandler)
          .set(fetchTicketsFx, fetchTicketsHandler),
      });

      await allSettled(searchInitiated, { scope });
      expect(scope.getState($tickets)).toEqual(testTickets);
    });
  });
});
