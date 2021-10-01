import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { aviasalesTheme } from './theme';
import { render } from '@testing-library/react';

const withTheme = (node: React.ReactNode) => (
  <ThemeProvider theme={aviasalesTheme}>
    {node}
  </ThemeProvider>
)

export const snapshotWithTheme = (node: React.ReactNode) => {
  return renderer.create(withTheme(node));
}

export const uiWithTheme = (node: React.ReactNode) => {
  return render(withTheme(node));
}

// TODO: можно обобщить в функцию вида (fn :: renderer -> node -> result)
