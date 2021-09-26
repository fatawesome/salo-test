import { SearchId, Ticket } from '../types';

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
    return (await response.json()).tickets;
  } else {
    throw new Error("Error fetching tickets.");
  }
}
