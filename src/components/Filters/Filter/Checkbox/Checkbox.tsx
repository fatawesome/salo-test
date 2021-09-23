import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: React.ChangeEventHandler
}

const Checkbox: React.FC<CheckboxProps> =
  ({ id,
     checked,
     disabled,
     children,
     onChange
  }) => {
  return (
    <>
      <input
        type="checkbox" id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span>
          {checked &&
            <img src={require('@/assets/icons/checkmark.svg')} alt="checked" />
          }
        </span>
        {children}
      </label>
    </>
  )
};

const StyledCheckbox = styled(Checkbox)`
  input[type="checkbox"] {
    display: none;
    border: none !important;
    box-shadow: none !important;
  }

  input[type="checkbox"] + label span {
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
  }

  input[type="checkbox"]:checked + label span {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  
  span {
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
  }
`;

export default StyledCheckbox;
