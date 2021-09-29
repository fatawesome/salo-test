import React from 'react';
import { Ticket as TicketT } from '../../types';
import { Ticket as TicketComponent } from '../Ticket';
import styled from 'styled-components';
import { AutoSizer, ListRowProps, List } from 'react-virtualized';

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
            rowHeight={204}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

const StyledTicketsList = styled(TicketsList)`
  height: ${props => props.tickets.length * 204}px;
  width: 100%;
`

export default StyledTicketsList;
