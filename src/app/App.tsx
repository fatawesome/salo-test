import React from 'react';
import { ThemeProvider } from 'styled-components';

import { aviasalesTheme } from '../theme/theme';
import SearchPage from './SearchPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={aviasalesTheme}>
      <SearchPage />
    </ThemeProvider>
  )
}

export default App;
