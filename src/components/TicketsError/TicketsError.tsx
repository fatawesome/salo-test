import React from 'react';
import styled from 'styled-components';
import { Button as ButtonComponent } from '../common/Button';
import { ColumnWrapper } from '../common/ColumnWrapper';

interface TicketsErrorProps {
  className?: string;
  tryAgain: () => void;
}

const Button = styled(ButtonComponent)`
  width: 100%;
`;

const Wrapper = styled(ColumnWrapper)`
  font-size: 16px;

  h4 {
    margin: 0 0 20px;
  }
`;

const TicketsError: React.FC<TicketsErrorProps> = ({ className, tryAgain }) => {
  return (
    <Wrapper className={className}>
      <h4>
        Упс! Поиск сломался.
        Попробуем ещё раз?
      </h4>
      <Button onClick={() => tryAgain()}>Повторить поиск</Button>
    </Wrapper>
  )
}

export default TicketsError;
