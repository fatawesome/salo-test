import React, { MouseEventHandler, useEffect } from 'react';
import styled from 'styled-components';
import { useEvent, useStore } from 'effector-react';

import { Sorting } from '../components/Sorting';
import { Filters as FiltersComponent } from '../components/Filters';
import { TicketsList } from '../components/TicketsList';
import { Button as ButtonComponent } from '../components/common/Button';

import { $ticketGetStatus, initSearch } from '../models/tickets';
import { $filterStates, toggleFilter } from '../models/filter';
import { $canShowMore, $shownAmount, AMOUNT_TO_SHOW, showMore } from '../models/showMore';
import { $sortStates, applySort } from '../models/sorting';

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

const Filters = styled(FiltersComponent)`
  margin-right: 20px;
`;

const Button = styled(ButtonComponent)`
  width: 100%;
`;

const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  const { loading, error, tickets } = useStore($ticketGetStatus);
  const filters = useStore($filterStates);
  const sortings = useStore($sortStates);
  const shownAmount = useStore($shownAmount);
  const canShowMore = useStore($canShowMore);

  const showMoreHandler = useEvent(showMore);
  const toggleFilterHandler = useEvent(toggleFilter);
  const applySortHandler = useEvent(applySort);

  useEffect(() => {
    initSearch();
  }, []);

  const showMoreClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    showMoreHandler(AMOUNT_TO_SHOW);
  };

  return (
    <div className={className}>
      <Filters filters={filters} onChange={toggleFilterHandler} />
      <Column>
        <Sorting sorts={sortings} onChange={applySortHandler} />
        {tickets && <TicketsList tickets={tickets.slice(0, shownAmount)} />}
        {loading && <div>loading</div>}
        {error && <div>error</div>}
        {canShowMore &&
          <Button onClick={showMoreClickHandler}>
            Показать еще {AMOUNT_TO_SHOW} билетов!
          </Button>
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
