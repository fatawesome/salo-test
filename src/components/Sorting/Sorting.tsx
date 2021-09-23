import React, { useState } from 'react';
import styled from 'styled-components';

import { SortTab } from './SortTab';

const TabsContainer = styled.div`
  width: 100%;
  & > *:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  & > *:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
`

interface TabOptions {
  slug: string;
  text: string;
  handler: () => void;
}

const Sorting: React.FC = () => {
  const [activeTabSlug, setActiveTabSlug] = useState('cheap');

  const tabs: TabOptions[] = [
    { slug: 'cheap', text: 'Самый дешевый', handler: () => console.log('Выбран дешевый') },
    { slug: 'fast', text: 'Самый быстрый', handler: () => console.log('Выбран быстрый') },
    { slug: 'optimal', text: 'Оптимальный', handler: () => console.log('Выбран оптимальный') }
  ];

  const tabElements = tabs.map(tab => (
    <SortTab
      onClick={() => setActiveTabSlug(tab.slug)}
      active={tab.slug === activeTabSlug}
      key={tab.slug}
    >
      {tab.text}
    </SortTab>
  ))

  return (
    <TabsContainer>
      {tabElements}
    </TabsContainer>
  )
}

export default Sorting;
