import styled from 'styled-components/macro';
import { Paper } from '@material-ui/core';
import theme from 'сomponents/theme';

export const DashboardListStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DashboardListItem = styled(Paper)`
  width: 300px;
  margin: 12px;
  flex: none;
  padding: 20px;
  cursor: pointer;
  
  &:hover {
      color: ${theme.palette.primary.light};
  }
`;
