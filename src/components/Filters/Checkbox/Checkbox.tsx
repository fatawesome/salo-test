import React from 'react';
import styled from 'styled-components';

interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: React.ChangeEventHandler
  disabled?: boolean;
  className?: string
}

const Checkbox: React.FC<CheckboxProps> =
  ({ id,
     checked,
     disabled,
     children,
     onChange,
     className
  }) => {
  return (
    <div className={className}>
      <input
        type="checkbox" id={id}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>
        <span data-testid="checkbox-box">
          {checked &&
            <img src={require('@/assets/icons/checkmark.svg')} alt="checked" />
          }
        </span>
        {children}
      </label>
    </div>
  )
};

const StyledCheckbox = styled(Checkbox)`
  &:hover {
    & * {
      cursor: pointer;
    }
    cursor: pointer;
    background-color: #F1FCFF;
  }
  
  input[type="checkbox"] {
    display: none;
    border: none !important;
    box-shadow: none !important;
  }

  input[type="checkbox"] + label span {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #9ABBCE;
    border-radius: 2px;
    margin-right: 10px;
  }

  input[type="checkbox"]:checked + label span {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    border: 1px solid #2196F3;
  }
  
  label {
    display: block;
    font-weight: normal;
    font-size: 13px;
    line-height: 20px;
    padding: 10px 20px;
    width: 100%;
  }
`;

export default StyledCheckbox;
