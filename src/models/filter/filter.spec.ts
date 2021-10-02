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
    test('toggle enables this and only this filter', async () => {
      const type: FilterType = 'Без пересадок';
      await allSettled<FilterType>(toggleFilter, { scope, params: type });
      const filter = scope.getState($filterStates).find(filter => filter.type === type);
      expect(filter?.selected).toBeTruthy();
      const otherFilters = scope.getState($filterStates).filter(filter => filter.type !== type);
      expect(otherFilters.every(f => !f.selected)).toBeTruthy();
    });

    test('sequential toggle enables toggled filters', () => {
      const types: FilterType[] = ['Без пересадок', '1 пересадка'];
      types.map(async type => {
        await allSettled<FilterType>(toggleFilter, { scope, params: type });
      });
      const toggledFilters = scope
        .getState($filterStates)
        .filter(f => types.find(t => t === f.type));
      expect(toggledFilters.every(f => f.selected)).toBeTruthy();
    });
  });

  describe('When filter is selected', () => {
    const type = 'Без пересадок';
    beforeEach(async () => {
      await allSettled<FilterType>(toggleFilter, { scope, params: type });
    })

    test('toggling selected filter disables it', async () => {
      await allSettled(toggleFilter, { scope, params: type });
      const filter = scope.getState($filterStates).find(filter => filter.type === type);
      expect(filter?.selected).toBeFalsy();
    });

    test('toggling another filter enables it and keep old one toggled', async () => {
      const newType = '1 пересадка';
      await allSettled(toggleFilter, { scope, params: newType });
      const filters = scope
        .getState($filterStates)
        .filter(f => [type, newType].find(t => t === f.type));
      expect(filters.every(f => f.selected)).toBeTruthy();
    })
  });


})
