import React from 'react';
import styled from 'styled-components';
import { ContentBlock } from '../common/ContentBlock';
import { Checkbox } from './Checkbox';
import { FilterType } from '../../types';

export interface FilterOptions {
  type: string;
  selected: boolean;
}

interface FiltersProps {
  filters: FilterOptions[];
  onChange: (type: FilterType) => void;
  className: string;
}

const Filters: React.FC<FiltersProps> = (props) => {

  const filters = props.filters.map(filter => (
    <Checkbox
      key={filter.type}
      id={filter.type}
      checked={filter.selected}
      onChange={() => {
        props.onChange(filter.type);
      }}
    >
      {filter.type}
    </Checkbox>
  ))

  return (
    <Container className={props.className}>
      <FiltersHeader>Количество пересадок</FiltersHeader>
      <FiltersWrapper>
        {filters}
      </FiltersWrapper>
    </Container>
  )
}

const Container = styled.div`
  min-width: 232px;
`

const FiltersHeader = styled.div`
  padding: 20px 20px 10px 20px;
  text-align: left;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`

const FiltersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`

export default ContentBlock(Filters);
