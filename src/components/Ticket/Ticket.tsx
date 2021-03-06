import React from 'react';
import styled from 'styled-components';

import { Ticket as TicketType } from '../../types';
import { Segment } from './Segment';
import { ContentBlock } from '../common/ContentBlock';
import { showPrice } from './helpers';

interface TicketCardProps {
  ticket: TicketType;
  className?: string;
}

const getCarrierImgURL = (iata: string) => `//pics.avs.io/99/36/${iata}.png`

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Price = styled.h4`
  color: ${props => props.theme.colors.cta};
  font-size: 24px;
  line-height: 24px;
  margin: 0;
`;

const StyledSegment = styled(Segment)`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }
`;

const Ticket: React.FC<TicketCardProps> = ({ ticket, className }) => {
  return (
    <div className={className}>
      <Header>
        <Price>{showPrice(ticket.price)} Р</Price>
        <img width={110} height={36} src={getCarrierImgURL(ticket.carrier)} alt={ticket.carrier} />
      </Header>
      {ticket.segments.map(segment => <StyledSegment segment={segment} key={segment.date} />)}
    </div>
  )
}

const StyledTicket = styled(Ticket)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 502px;
  min-height: 184px;
  padding: 20px;
`

export default React.memo(ContentBlock(StyledTicket));
