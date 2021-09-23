import React from 'react';
import styled from 'styled-components';
import { Checkbox } from './Checkbox';



const Filter = () => {
  return (
    <div>
      <Checkbox id={"1"} checked={true} onChange={() => console.log('checkbox click')}>
        Без пересадок
      </Checkbox>
    </div>
  )
};

const StyledFilter = styled(Filter)`
  padding: 10px 20px;
  width: 100%;
  max-height: 40px;
  &:hover {
    cursor: pointer;
    background-color: #F1FCFF;
  }
`;

export default StyledFilter;
