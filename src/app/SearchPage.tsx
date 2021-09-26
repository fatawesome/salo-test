import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Ticket } from '../components/Ticket';
import { Sorting } from '../components/Sorting';
import { Filters as FiltersModule } from '../components/Filters';
import { useStore } from 'effector-react';
import { $ticketGetStatus, initSearch } from '../models/tickets';
import { $filterStates, toggleFilter } from '../models/filter';

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

const Filters = styled(FiltersModule)`
  margin-right: 20px;
`;

const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  const { loading, error, tickets } = useStore($ticketGetStatus);
  const filters = useStore($filterStates);

  useEffect(() => {
    initSearch();
  }, [])

  return (
    <div className={className}>
      <Filters filters={filters} onChange={toggleFilter} />
      <Column>
        <Sorting />
        { loading && <div>loading</div> }
        { error
          ? <div>error</div>
          : tickets.slice(0, 5).map(ticket => {
              return <Ticket ticket={ticket} key={ticket.id} />;
            })
        }

      </Column>
    </div>
  )
}

const StyledSearchPage = styled(SearchPage)`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

export default StyledSearchPage;
