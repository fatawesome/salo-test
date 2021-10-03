import { allSettled, fork } from 'effector';
import './init';
import { $sortStates, applySort, DEFAULT_SORT, resetSort } from './index';
import { SortType } from '../../types';

describe('Sorting module', () => {
  const scope = fork();
  afterEach(() => {
    resetSort();
  });

  describe('When module is initialized', () => {
    test('default sorting is chosen', () => {
      const defaultSortState = scope
        .getState($sortStates)
        .find(sort => sort.type === DEFAULT_SORT.type);
      expect(defaultSortState?.selected).toBeTruthy();
    });
  });

  describe('When new sort is applied', () => {
    test('this and only this sort is set', async () => {
      const type = 'Самый быстрый';
      await allSettled<SortType>(applySort, { scope, params: type });
      const sortStates = scope.getState($sortStates);

      const selectedSort = sortStates.find(sort => sort.type === type);
      expect(selectedSort?.selected).toBeTruthy();

      const otherSorts = sortStates.filter(sort => sort.type !== type);
      expect(otherSorts.every(sort => !sort.selected)).toBeTruthy();
    })
  })
});
