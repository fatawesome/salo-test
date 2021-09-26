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


export type FilterType = string;
export type FilterFn = (ticket: Ticket) => boolean;

export interface Filter {
  type: FilterType;
  selected: boolean;
  fn: FilterFn;
}