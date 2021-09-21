export interface Segment {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: number;
}

export interface Ticket {
  price: number;
  carrier: string;
  segments: Segment[] // as it was told, precisely 2 segments are allowed.
}
