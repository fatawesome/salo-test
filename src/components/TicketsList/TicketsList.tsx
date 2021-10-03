import React from 'react';
import { Ticket as TicketT } from '../../types';
import { Ticket as TicketComponent } from '../Ticket';
import styled from 'styled-components';

interface TicketsListProps {
  tickets: TicketT[];
  className?: string
}

// TODO: Хардкод - плохо.
// В этом случае он приводит к необходимости хендлить лишние 20 пикселей на уровне консьюмера,
// что в целом не очень хорошо, но так было значительно быстрее,
// чем задавать динамическую высоту элемента списка в <List> из react-virtualized.
const TICKET_HEIGHT = 204;

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

export default StyledTicketsList;
