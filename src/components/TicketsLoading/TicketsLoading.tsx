import React from 'react';
import styled from 'styled-components';
import { ColumnWrapper } from '../common/ColumnWrapper';

interface TicketsLoadingProps {
  className?: string;
}

const Wrapper = styled(ColumnWrapper)`
  margin-bottom: 20px; // TODO: вынести наружу. Писать внешние спейсинги в компоненте - плохо.
  font-size: 16px;
`;

const TicketsLoading: React.FC<TicketsLoadingProps> = ({ className }) => {
  return (
    <Wrapper>
      Крутим-мутим-вертим...
    </Wrapper>
  )
}

export default TicketsLoading;
