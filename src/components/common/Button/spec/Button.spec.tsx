import React from 'react';
import renderer from 'react-test-renderer';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { aviasalesTheme } from '../../../../theme/theme';

import Button from '../Button';

describe('Button component', () => {
  const buttonText = 'Click me'
  const clickHandler = jest.fn();

  test('renders correctly', () => {
    // TODO: сделать враппер над рендерером, чтобы не прокидывать тему каждый раз
    const component = renderer.create(
      <ThemeProvider theme={aviasalesTheme}>
        <Button onClick={clickHandler}>{buttonText}</Button>
      </ThemeProvider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  test('is clickable', () => {
    render(
      <ThemeProvider theme={aviasalesTheme}>
        <Button onClick={clickHandler}>{buttonText}</Button>
      </ThemeProvider>
    );
    userEvent.click(screen.getByText(buttonText));
    expect(clickHandler).toBeCalledTimes(1);
  });
})
