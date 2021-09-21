import React from 'react';
import styled from 'styled-components';

import { Ticket as TicketType } from '../../models';
import { Segment } from './Segment';

interface TicketCardProps {
  ticket: TicketType;
  className?: string;
}

const Ticket: React.FC<TicketCardProps> = ({ ticket, className }) => {
  return (
    <div className={className}>
      {ticket.segments.map(segment => <Segment segment={segment} key={segment.date} />)}
    </div>
  )
}

const StyledTicketCard = styled(Ticket)`
  width: 100%;
  max-width: 502px;
  min-height: 184px;
  padding: 20px;
`

export default StyledTicketCard;
