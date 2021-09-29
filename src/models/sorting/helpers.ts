import { Ticket } from '../../types';

const weights = {
  price: 1,
  stop: 1000,
  hour: 500
}

function getTicketDurationScore(minutes: number, weight: number): number {
  return minutes / 60 * weight;
}

function getTicketStopsScore(ticket: Ticket, weight: number): number {
  const stopsAmount = ticket.segments
    .reduce((acc, s) => acc + s.stops.length, 0);
  return stopsAmount * weight;
}

/**
 * Convert all affecting fields into price (i.e. 1 stop is equivalent to 1000 rubs) and sum.
 * The lower the score, the better.
 *
 * На самом деле, много чего бы тут учитывать: пересадки в разных аэропортах, качество авиалиний и тд.
 * Можно сделать веса динамичными (например, чем дольше перелет, тем меньше/больше скор одного часа в полете).
 */
export function getOptimalityScore(ticket: Ticket): number {
  return ticket.price * weights.price
    + getTicketDurationScore(getTicketDuration(ticket), weights.hour)
    + getTicketStopsScore(ticket, weights.stop);
}

export function compareOnOptimality(a: Ticket, b: Ticket): number {
  return getOptimalityScore(a) - getOptimalityScore(b);
}

export function compareOnDuration(a: Ticket, b: Ticket): number {
  return getTicketDuration(a) - getTicketDuration(b);
}

export function compareOnPrice(a: Ticket, b: Ticket): number {
  return a.price - b.price;
}

export const getTicketDuration = (t: Ticket): number =>
  t.segments.reduce((acc, s) => acc + s.duration, 0);
