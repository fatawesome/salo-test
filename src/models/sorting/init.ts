import { $sort, $sortStates, applySort, resetSort } from './index';

$sortStates.on(applySort, (sorts, type) =>
  sorts.map(sort => ({
    ...sort,
    selected: sort.type === type
  }))
);
$sortStates.reset([resetSort]);

$sort.on($sortStates, (_, sorts) => sorts.find(sort => sort.selected));
