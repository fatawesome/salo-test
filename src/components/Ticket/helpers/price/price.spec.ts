import { showPrice } from './index';
import { testTickets } from '../../../../stubs';

describe('Ticket price utils', () => {
  describe('showPrice', () => {
    test('shows price', () => { // лол нейминг
      expect(showPrice(testTickets[0].price)).toBe('29 224')
    })
  })
})
