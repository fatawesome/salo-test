import { FAKE_SEARCH_ID, testTickets } from '../../stubs';
import { allSettled } from 'effector';
import { $fetchError, $searchId, $tickets, resetTickets, searchInitiated } from './index';

import './init';
import { forkWithSearchHandlers } from '../../tests/helpers';

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
