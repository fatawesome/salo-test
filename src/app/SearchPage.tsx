import React, { MouseEventHandler, useEffect } from 'react';
import styled from 'styled-components';

import { Sorting } from '../components/Sorting';
import { Filters as FiltersComponent } from '../components/Filters';
import { useStore } from 'effector-react';
import { $ticketGetStatus, initSearch } from '../models/tickets';
import { $filterStates, toggleFilter } from '../models/filter';
import { Button as ButtonComponent } from '../components/common/Button';
import { $canShowMore, $shownAmount, AMOUNT_TO_SHOW, showMore } from '../models/showMore';
import TicketsList from '../components/TicketsList';

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
  const shownAmount = useStore($shownAmount);
  const canShowMore = useStore($canShowMore);

  useEffect(() => {
    initSearch();
  }, []);

  const showMoreClickHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    showMore(AMOUNT_TO_SHOW);
  };

  return (
    <div className={className}>
      <Filters filters={filters} onChange={toggleFilter} />
      <Column>
        <Sorting />
        { loading && <div>loading</div> }
        { error // TODO: show error after already shown tickets.
          ? <div>error</div>
          : <TicketsList tickets={tickets.slice(0, shownAmount)} />
        }
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
