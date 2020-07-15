import { createGlobalStyle } from 'styled-components/macro';
import theme from 'сomponents/theme';

export const AppStyles = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
    transition-duration: ${theme.transitions.duration.shortest}ms;
  }
`;
