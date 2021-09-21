import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    boxShadow: string;
    colors: {
      background: '#FFFFFF';

      cta: string; // buttons, checkboxes, price (i.e. everything screaming on user)
      textPrimary: string;
      textSecondary: string;
    };
  }
}
