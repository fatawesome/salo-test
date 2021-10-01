import '../init';
import { allSettled, fork } from 'effector';
import { $filterStates, resetFilters, toggleFilter } from './index';
import { FilterType } from '../../types';

describe('Filter store', () => {
  const scope = fork();

  afterEach(async () => {
    await allSettled(resetFilters, { scope });
  });

  describe('When no filters are enabled', () => {
    test('toggle enables filter', async () => {
      const params: FilterType = 'Без пересадок';
      await allSettled<FilterType>(toggleFilter, { scope, params });
      const filter = scope.getState($filterStates).find(filter => filter.type === params);
      expect(filter?.selected).toBeTruthy();
    });

    test('sequential toggle enables toggled filters', () => {
      const types: FilterType[] = ['Без пересадок', '1 пересадка'];
      types.map(async params => {
        await allSettled<FilterType>(toggleFilter, { scope, params });
      });
      const toggledFilters = scope
        .getState($filterStates)
        .filter(f => types.find(t => t === f.type));
      expect(toggledFilters.every(f => f.selected)).toBeTruthy();
    });
  });
})
