import React from 'react';
import styled, { css } from 'styled-components';

interface SortTabProps {
  onClick: React.MouseEventHandler;
  active?: boolean;
  disabled?: boolean;
  className?: string;
}

const SortTab: React.FC<SortTabProps> =
  ({ children,
     onClick,
     disabled,
     className
  }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}

const StyledSortTab = styled(SortTab)`
  display: block;
  padding: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 12px;
  line-height: 20px;
  border: 1px solid #DFE5EC;
  background-color: ${props => props.theme.colors.background};
  
  ${props => props.active && css`
    background-color: ${props => props.theme.colors.cta};
    color: #FFFFFF;
    border: none;
  `}
  
  &:hover {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    cursor: pointer;
  }
`

export default StyledSortTab;
