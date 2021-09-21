import React from 'react';
import styled from 'styled-components';

import { tickets } from '../stubs';
import { Ticket } from '../components/Ticket';

interface SearchPageProps {
  className?: string
}

const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  return (
    <main className={className}>
      {tickets.map(ticket => {
        return <Ticket ticket={ticket} key={ticket.carrier} /> // TODO: lol that's a bad key.
      })}
    </main>
  )
}

const StyledSearchPage = styled(SearchPage)`
  background-color: #F3F7FA;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export default StyledSearchPage;
