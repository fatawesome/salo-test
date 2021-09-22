import React from 'react';
import styled from 'styled-components';

import { tickets } from '../stubs';
import { Ticket } from '../components/Ticket';

interface SearchPageProps {
  className?: string
}

const TicketsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledTicket = styled(Ticket)`
  margin-bottom: 20px;
`

const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  return (
    <div className={className}>
      <TicketsWrapper>
        {tickets.map(ticket => {
          return <StyledTicket ticket={ticket} key={ticket.carrier} />; // TODO: lol that's a bad key.
        })}
      </TicketsWrapper>
    </div>
  )
}

const StyledSearchPage = styled(SearchPage)`
  background-color: #F3F7FA;
`

export default StyledSearchPage;
