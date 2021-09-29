import React from 'react';
import styled from 'styled-components';

import { SortTab } from './SortTab';
import { Sort, SortType } from '../../types';

const TabsContainer = styled.div`
  width: 100%;
  display: flex;
  & > * {
    flex-grow: 1;
  }
  & > *:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  & > *:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

interface SortingProps {
  sorts: Sort[];
  onChange: (type: SortType) => void;
  className?: string
}

const Sorting: React.FC<SortingProps> = ({ sorts, onChange, className }) => {
  const tabElements = sorts.map(sort => (
    <SortTab
      onClick={() => onChange(sort.type)}
      active={sort.selected}
      key={sort.type}
    >
      {sort.type}
    </SortTab>
  ))

  return (
    <TabsContainer className={className}>
      {tabElements}
    </TabsContainer>
  )
}

export default Sorting;
