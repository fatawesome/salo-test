import { hasAmountOfStops } from './index';
import { testTickets } from '../../../stubs';

describe('Tickets filtering helpers', () => {
  describe('hasAmountOfStops', () => {
    test('works correctly', () => {
      expect(hasAmountOfStops(3)(testTickets[0])).toBeTruthy();
      expect(hasAmountOfStops(0)(testTickets[1])).toBeFalsy();
    })
  })
})
