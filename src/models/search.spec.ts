import './init';
import { allSettled } from 'effector';
import { $ticketGetStatus, resetTickets, searchInitiated } from './tickets';
import { FAKE_SEARCH_ID, testTickets } from '../stubs';
import { $filtersFn, resetFilters, toggleFilter } from './filter';
import { $sortFn, applySort, resetSort } from './sorting';
import { resetShownAmount } from './showMore';
import { forkWithSearchHandlers } from '../tests/helpers';
import { FilterType, SortType } from '../types';

describe('Search modules integration', () => {
  let initSearchHandler = jest.fn(() => FAKE_SEARCH_ID);
  let fetchTicketsHandler = jest.fn(
    () => ({
      tickets: testTickets,
      stop: false
    })
  );

  // It could be the case, that not every possible store is being reset here, and it could cause errors.
  // It could be a great idea to make some "integration" module,
  // where such stuff can be handled (i.e. search/index|init.ts)
  //
  // Also could be nice to have some handler like "reset all stores", but I did not manage to find it in Effector API
  // and is too lazy to implement it myself.
  afterEach(() => {
    resetTickets();
    resetFilters();
    resetShownAmount();
    resetSort();
    initSearchHandler.mockClear();
    fetchTicketsHandler.mockClear();
  });

  describe('When tickets are fetched', () => {
    test('tickets are sorted and filtered with respect to chosen sort and filters', async () => {
      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);
      await allSettled(searchInitiated, { scope });
      const storedTickets = scope.getState($ticketGetStatus).tickets;

      expect(storedTickets).toEqual(
        testTickets
          .filter(scope.getState($filtersFn))
          .sort(scope.getState($sortFn))
      );
    });
  });

  describe('When filter is toggled', () => {
    test('tickets are filtered respectively', async () => {
      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);
      await allSettled(searchInitiated, { scope });
      await allSettled<FilterType>(toggleFilter, { scope, params: 'Без пересадок' });
      const storedTickets = scope.getState($ticketGetStatus).tickets;

      expect(storedTickets).toEqual(
        testTickets
          .filter(scope.getState($filtersFn))
          .sort(scope.getState($sortFn)) // result is also sorted
      );
    })
  });

  describe('When sort is changed', () => {
    test('tickets are sorted respectively', async () => {
      const scope = forkWithSearchHandlers(initSearchHandler, fetchTicketsHandler);
      await allSettled(searchInitiated, { scope });
      await allSettled<SortType>(applySort, { scope, params: 'Оптимальный' });
      const storedTickets = scope.getState($ticketGetStatus).tickets;

      expect(storedTickets).toEqual(testTickets.sort(scope.getState($sortFn)));
    })
  })
});


