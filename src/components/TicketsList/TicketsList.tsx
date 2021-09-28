import React from 'react';
import { Ticket as TicketT } from '../../types';
import { Ticket } from '../Ticket';

interface TicketsListProps {
  tickets: TicketT[];
}

// TODO: сюда бы скелетон...
const TicketsList: React.FunctionComponent<TicketsListProps> = ({ tickets }) => {
  const ticketsBlocks = tickets.map(ticket => <Ticket ticket={ticket} key={ticket.id} />)
  return (
    <>
      {ticketsBlocks}
    </>
  );
};

export default TicketsList
