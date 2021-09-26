import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  className?: string;
  onClick: MouseEventHandler;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button onClick={props.onClick} className={props.className}>
      {props.children}
    </button>
  )
}

const StyledButton = styled(Button)`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.cta};
  color: #FFFFFF;
  text-transform: uppercase;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 5px;
  border: none;
  
  &:active {
    filter: none;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default StyledButton;
