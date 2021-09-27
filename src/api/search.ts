import { SearchId, Ticket } from '../types';
import { nanoid } from 'nanoid';

const BASE_URL = 'https://front-test.beta.aviasales.ru';

export async function getSearchId(): Promise<SearchId> {
  const response = await fetch(`${BASE_URL}/search`, { method: 'GET' });
  if (response.ok) {
    return (await response.json()).searchId;
  } else {
    throw new Error("Error starting search.")
  }
}

export interface TicketsResponse {
  tickets: Ticket[];
  stop: boolean;
}

export async function getTickets(searchId: string): Promise<TicketsResponse> {
  const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`, { method: 'GET' });
  if (response.ok) {
    const res: TicketsResponse = await response.json();
    return {
      stop: res.stop,
      tickets: res.tickets.map(ticket => ({ ...ticket, id: nanoid() }))
    };
  } else {
    throw new Error("Error fetching tickets.");
  }
}
