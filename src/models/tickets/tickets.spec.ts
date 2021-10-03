import { testTickets } from '../../stubs';
import { allSettled, fork } from 'effector';
import { $fetchError, $searchId, $tickets, fetchTicketsFx, initSearchFx, resetTickets, searchInitiated } from './index';
import { Ticket } from '../../types';

import './init';

function forkWithSearchHandlers(
  initSearchHandler: jest.Mock<string, []>,
  fetchTicketsHandler: jest.Mock<{ tickets: Ticket[]; stop: boolean; }, []>
) {
  return fork({
    handlers: new Map()
      .set(initSearchFx, initSearchHandler)
      .set(fetchTicketsFx, fetchTicketsHandler)
  })
}

const FAKE_SEARCH_ID = 'FAKE_SEARCH_ID';

describe('Tickets module', () => {
  afterEach(() => {
    resetTickets();
  });

  describe('When search is initiated', () => {
    test('tickets are set after completing all side-effects', async () => {
      let initSearchHandler = jest.fn(() => FAKE_SEARCH_ID);
      let fetchTicketsHandler = jest.fn(
        () => ({
          tickets: testTickets,
          stop: false
        })
      );

      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);

      await allSettled(searchInitiated, { scope });
      expect(scope.getState($tickets)).toEqual(testTickets);
    });
  });

  describe('Tickets fetching errors', () => {
    test('if fetching searchId throws an error, tickets are not updated and error is set', async () => {
      const errorMessage = 'Fetch searchId failed';
      let initSearchHandler = jest.fn(() => { throw new Error(errorMessage) });
      let fetchTicketsHandler = jest.fn(
        () => ({
          tickets: testTickets,
          stop: false
        })
      );

      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);
      await allSettled(searchInitiated, { scope });
      expect(scope.getState($tickets)).toEqual([]);
      expect(scope.getState($fetchError)).toEqual(new Error(errorMessage));
    });

    test('if fetching tickets throws an error, searchId is set, tickets are not updated, and error is set', async () => {
      const errorMessage = 'Fetch tickets failed';
      let initSearchHandler = jest.fn(() => FAKE_SEARCH_ID );
      let fetchTicketsHandler = jest.fn(() => { throw new Error(errorMessage) });

      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);
      await allSettled(searchInitiated, { scope });
      expect(scope.getState($searchId)).toEqual(FAKE_SEARCH_ID)
      expect(scope.getState($tickets)).toEqual([]);
      expect(scope.getState($fetchError)).toEqual(new Error(errorMessage));
    });
  })
});
