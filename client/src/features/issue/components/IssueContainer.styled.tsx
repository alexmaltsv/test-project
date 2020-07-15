import styled from 'styled-components/macro';
import theme from 'сomponents/theme';

export const IssueContainerText = styled.div`
  cursor: pointer;
  padding: 16px;
  
  transition-duration: ${theme.transitions.duration.shortest}ms;
  
  &:hover {
      color: ${theme.palette.primary.light}
  }
`;
