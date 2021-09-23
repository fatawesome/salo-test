import React from 'react';
import styled from 'styled-components';
import { Filter } from './Filter';

const Container = styled.div`
  max-width: 232px;
`

const FiltersHeader = styled.span`
  margin: 0 20px;
  text-align: center;
  vertical-align: center;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Filters: React.FC = () => {
  return (
    <Container>
      <FiltersHeader>Количество пересадок</FiltersHeader>

      <FiltersWrapper>
        <Filter />
        <Filter />
        <Filter />
        <Filter />
      </FiltersWrapper>
    </Container>
  )
}

export default Filters;
