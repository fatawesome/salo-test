import { ComponentType } from 'react';
import styled, { StyledComponent } from 'styled-components';

/* eslint-disable @typescript-eslint/no-explicit-any */
const ContentBlock = (component: keyof JSX.IntrinsicElements | ComponentType<any>): StyledComponent<any, any> => {
  return styled(component)`
    background-color: ${props => props.theme.colors.background};
    box-shadow: ${props => props.theme.boxShadow};
    border-radius: 5px;
  `;
}

export default ContentBlock
