import React from 'react';
import styled from 'styled-components';

import { tickets } from '../stubs';
import { Ticket } from '../components/Ticket';
import { Sorting } from '../components/Sorting';

interface SearchPageProps {
  className?: string
}

const Column = styled.div`
  max-width: 502px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    margin-bottom: 20px;
  }
`

const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  return (
    <div className={className}>
      <Column>
        <Sorting />
        {tickets.map(ticket => {
          return <Ticket ticket={ticket} key={ticket.carrier} />; // TODO: lol that's a bad key.
        })}
      </Column>
    </div>
  )
}

const StyledSearchPage = styled(SearchPage)`
  background-color: #F3F7FA;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default StyledSearchPage;
