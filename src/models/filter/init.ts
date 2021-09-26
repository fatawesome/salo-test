import { $filters, $filterStates, toggleFilter } from './index';

$filterStates
  .on(toggleFilter, (list, type) =>
    list.map(filter => ({
      ...filter,
      selected: filter.type === type ? !filter.selected : filter.selected
    }))
  );

$filters.on(
  $filterStates,
  (_, list) =>
    list.filter(filter => filter.selected).map(filter => filter.fn)
);
