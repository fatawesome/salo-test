export type SearchId = string;

export interface Segment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  id?: number | string;
  price: number;
  carrier: string;
  segments: Segment[] // as it was told, precisely 2 segments are allowed.
}


export type FilterType = 'Без пересадок' | '1 пересадка' | '2 пересадки' | '3 пересадки';
export type FilterFn = (ticket: Ticket) => boolean;

export interface Filter {
  type: FilterType;
  selected: boolean;
  fn: FilterFn;
}

export type SortType = 'Самый дешевый' | 'Самый быстрый' | 'Оптимальный';
export type SortFn = (a: Ticket, b: Ticket) => number;
export interface Sort {
  type: SortType;
  selected: boolean;
  comparator: SortFn;
}
