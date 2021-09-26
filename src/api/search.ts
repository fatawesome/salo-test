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

export async function getTickets(searchId: string): Promise<Ticket[]> {
  const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`, { method: 'GET' });
  if (response.ok) {
    const tickets: Ticket[] = (await response.json()).tickets;
    return tickets.map(ticket => ({ ...ticket, id: nanoid() }));
  } else {
    throw new Error("Error fetching tickets.");
  }
}
