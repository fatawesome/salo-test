import React from 'react';
import { Ticket as TicketT } from '../../types';
import { Ticket as TicketComponent } from '../Ticket';
import styled from 'styled-components';

interface TicketsListProps {
  tickets: TicketT[];
  className?: string
}

const Ticket = styled(TicketComponent)`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const TicketsList: React.FunctionComponent<TicketsListProps> = ({ tickets, className }) => {
  return (
    <div className={className}>
      {tickets.map(ticket => <Ticket ticket={ticket} key={ticket.id} />)}
    </div>
  );
};

const StyledTicketsList = styled(TicketsList)`
  width: 100%;
`

export default React.memo(StyledTicketsList);
