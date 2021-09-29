import React, { MouseEventHandler, useEffect } from 'react';
import styled from 'styled-components';
import { useEvent, useStore } from 'effector-react';

import { Sorting } from '../components/Sorting';
import { Filters as FiltersComponent } from '../components/Filters';
import { TicketsList as TicketsListComponent } from '../components/TicketsList';
import { Button as ButtonComponent } from '../components/common/Button';

import { $ticketGetStatus, initSearch } from '../models/tickets';
import { $filterStates, toggleFilter } from '../models/filter';
import { $canShowMore, $shownAmount, AMOUNT_TO_SHOW, showMore } from '../models/showMore';
import { $sortStates, applySort } from '../models/sorting';
import { TicketsError } from '../components/TicketsError';
import { ColumnWrapper } from '../components/common/ColumnWrapper';
import { TicketsLoading } from '../components/TicketsLoading';

interface SearchPageProps {
  className?: string
}

const Column = styled(ColumnWrapper)`
  max-width: 502px;
`;

const Filters = styled(FiltersComponent)`
  // TODO: nit - много спейсингов с таким значением, было бы неплохо в тему вытащить.
  margin-right: 20px;
`;

const TicketsList = styled(TicketsListComponent)`
  margin-top: 20px;
`;

const Button = styled(ButtonComponent)`
  width: 100%;
`;

// TODO: сделаем вид, что тут нормальный лоадер и нормальное уведомление об ошибке.
const SearchPage: React.FC<SearchPageProps> = ({ className }) => {
  const { loading, error, tickets } = useStore($ticketGetStatus);
  const filters = useStore($filterStates);
  const sorts = useStore($sortStates);
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
        <Sorting sorts={sorts} onChange={applySortHandler} />
        {tickets && <TicketsList tickets={tickets.slice(0, shownAmount)} />}
        {loading && <TicketsLoading />}
        {error && <TicketsError tryAgain={initSearch} />}
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
