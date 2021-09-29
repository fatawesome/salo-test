import { $sort, $sortStates, applySort } from './index';

$sortStates.on(applySort, (sorts, type) =>
  sorts.map(sort => ({
    ...sort,
    selected: sort.type === type
  }))
);

$sort.on($sortStates, (_, sorts) => sorts.find(sort => sort.selected));
