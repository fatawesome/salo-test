import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from '../Button';
import { snapshotWithTheme, uiWithTheme } from '../../../../theme/utils';

describe('Button component', () => {
  const buttonText = 'Click me'
  const clickHandler = jest.fn();

  test('renders correctly', () => {
    const component = snapshotWithTheme(
      <Button onClick={clickHandler}>{buttonText}</Button>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('is clickable', () => {
    uiWithTheme(<Button onClick={clickHandler}>{buttonText}</Button>)
    userEvent.click(screen.getByText(buttonText));
    expect(clickHandler).toBeCalledTimes(1);
  });
})
