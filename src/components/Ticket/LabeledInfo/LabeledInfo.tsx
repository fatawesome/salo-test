import React from 'react';
import styled from 'styled-components';
import { LabeledInformation } from '../types';

type LabeledInfoProps = LabeledInformation & { className?: string };

const Label = styled.span`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 12px;
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-style: normal;
`;

const Information = styled.span`
  color: ${props => props.theme.colors.textPrimary};
  font-size: 14px;
  line-height: 21px;
`;

const LabeledInfo: React.FC<LabeledInfoProps> = (props) => {
  return (
    <div className={props.className}>
      <Label>{props.label}</Label>
      <Information>{props.information}</Information>
    </div>
  )
}

const StyledLabelInfo = styled(LabeledInfo)`
  display: flex;
  flex-direction: column;
`

export default StyledLabelInfo;
