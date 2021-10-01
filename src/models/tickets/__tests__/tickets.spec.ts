import { allSettled, fork } from 'effector';
import { $tickets, fetchTicketsFx, initSearchFx, searchInitiated } from '../index';
import { testTickets } from '../../../stubs';

// лол я два часа думал, почему тест не работает только чтобы понять,
// что я не запустил инициализацию))0)0
import '../init';

describe('Tickets fetching module', () => {
  test('sets tickets after initiating search', async () => {
    let initSearchHandler = jest.fn(() => 'FAKE_SEARCH_ID');
    let fetchTicketsHandler = jest.fn(
      () => ({
        tickets: testTickets,
        stop: false
      })
    );

    const scope = fork({
      handlers: new Map()
        .set(initSearchFx, initSearchHandler)
        .set(fetchTicketsFx, fetchTicketsHandler),
    });

    await allSettled(searchInitiated, { scope });
    expect(scope.getState($tickets)).toEqual(testTickets);
  })
})
