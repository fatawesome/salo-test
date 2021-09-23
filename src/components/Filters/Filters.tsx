import React from 'react';
import styled from 'styled-components';
import { ContentBlock } from '../common/ContentBlock';
import { Checkbox } from './Checkbox';

export interface FilterOptions {
  slug: string;
  active: boolean;
  text: string;
}

interface FiltersProps {
  filters: FilterOptions[];
  onChange: (filter: FilterOptions) => void;
  className: string;
}

const Filters: React.FC<FiltersProps> = (props) => {

  const filters = props.filters.map(filter => (
    <Checkbox
      key={filter.slug}
      id={filter.slug}
      checked={filter.active}
      onChange={() => {
        console.log(`Filter "${filter.text}" clicked`);
        props.onChange(filter);
      }}
    >
      {filter.text}
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
