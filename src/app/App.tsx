import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';

import { aviasalesTheme } from '../theme/theme';
import SearchPage from './SearchPage';

import openSansRegularWoff2 from '../assets/fonts/open-sans-v23-latin_cyrillic-regular.woff2';
import openSans600Woff2 from '../assets/fonts/open-sans-v23-latin_cyrillic-600.woff2';

const GlobalStyle = createGlobalStyle`
  /* open-sans-regular - latin_cyrillic */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: local(''),
    url('${openSansRegularWoff2}') format('woff2');
  }

  /* open-sans-600 - latin_cyrillic */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 600;
    src: local(''),
    url('${openSans600Woff2}') format('woff2');
  }

  body {
    height: 100%;
    background-color: #F3F7FA;
    font-family: 'Open Sans', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 20px;
  }

  * {
    box-sizing: border-box;
  }
`

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={aviasalesTheme}>
        <SearchPage />
      </ThemeProvider>
    </>
  )
}

export default App;
