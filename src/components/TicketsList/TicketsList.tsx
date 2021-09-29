import React from 'react';
import { Ticket as TicketT } from '../../types';
import { Ticket as TicketComponent } from '../Ticket';
import styled from 'styled-components';
import { AutoSizer, ListRowProps, List } from 'react-virtualized';

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
  function rowRenderer({key, index, style}: ListRowProps) {
    return <Ticket ticket={tickets[index]} key={key} style={style} />
  }

  return (
    <div className={className}>
      <AutoSizer>
        {({height, width}) => (
          <List
            height={height}
            rowCount={tickets.length}
            rowHeight={TICKET_HEIGHT}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

const StyledTicketsList = styled(TicketsList)`
  height: ${props => props.tickets.length * TICKET_HEIGHT}px;
  width: 100%;
`

export default StyledTicketsList;
