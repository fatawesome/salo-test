import React, { useState } from 'react';
import styled from 'styled-components';

import { tickets } from '../stubs';
import { Ticket } from '../components/Ticket';
import { Sorting } from '../components/Sorting';
import { FilterOptions, Filters as FiltersModule } from '../components/Filters';

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
  const [filters, setFilters] = useState([
    { active: false, text: 'Без пересадок', slug: 'zero' },
    { active: false, text: '1 пересадка', slug: 'one' },
    { active: false, text: '2 пересадки', slug: 'two' },
    { active: false, text: '3 пересадки', slug: 'three' },
    { active: false, text: '>3 пересадок', slug: 'more' },
  ]);

  const toggleFilter = (filter: FilterOptions): void => {
    setFilters(filters.map(f => {
      return f.slug === filter.slug
        ? { ...filter, active: !filter.active }
        : f
    }))
  }

  return (
    <div className={className}>
      <Filters filters={filters} onChange={toggleFilter} />
      <Column>
        <Sorting />
        {tickets.map(ticket => {
          // TODO: lol that's a bad key. Probably we can assign an id to tickets after fetching from API.
          return <Ticket ticket={ticket} key={ticket.carrier} />;
        })}
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
