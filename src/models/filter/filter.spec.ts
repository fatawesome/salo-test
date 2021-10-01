import '../init';
import { fork, Scope } from 'effector';
import { $filterStates, resetFilters, toggleFilter } from './index';
import { FilterType } from '../../types';

describe('Filter store', () => {
  let scope = fork();
  beforeEach(() => {
    resetFilters();
  });

  describe('When no filters are enabled', () => {
    test('toggle enables filter', () => {
      const type: FilterType = 'Без пересадок';
      toggleFilter(type);
      const filter = scope.getState($filterStates).find(filter => filter.type === type);
      expect(filter?.selected).toBeTruthy();
    });

    test('sequential toggle enables toggled filters', () => {
      $filterStates.reset();
      console.log(scope.getState($filterStates));
      const types: FilterType[] = ['Без пересадок', '1 пересадка'];
      types.map(type => {
        toggleFilter(type);
      });
      const filtersAreEnabled = scope
        .getState($filterStates)
        .filter(f => types.find(t => t === f.type))
        .every(f => f.selected);
      expect(filtersAreEnabled).toBeTruthy();
    });
  });
})
