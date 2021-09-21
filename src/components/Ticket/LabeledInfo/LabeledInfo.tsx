import React from 'react';
import styled from 'styled-components';
import { LabeledInformation } from '../types';

type LabeledInfoProps = LabeledInformation & { className?: string };

const Label = styled.span`
  color: ${props => props.theme.colors.textSecondary};
`;
const Information = styled.span`
  color: ${props => props.theme.colors.textPrimary};
`;

const LabeledInfo: React.FC<LabeledInfoProps> = (props) => {
  return (
    <div className={props.className}>
      <Label>{props.label}</Label>
      <Information>{props.information}</Information>
    </div>
  )
}

// TODO: font and stuff;
const StyledLabelInfo = styled(LabeledInfo)`
  text-transform: capitalize;
  display: flex;
  flex-direction: column;
`

export default StyledLabelInfo;
