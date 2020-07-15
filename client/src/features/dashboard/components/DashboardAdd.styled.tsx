import styled from 'styled-components/macro';
import { Paper } from '@material-ui/core';
import theme from 'сomponents/theme';

export const DashboardAddStyled = styled(Paper)`
  padding: 20px;
  margin: 0 12px;
  cursor: pointer;
  
  &:hover {
      color: ${theme.palette.primary.light};
  }
`;

export const DashboardAddForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const DashboardAddFormFooter = styled.div`
    margin-top: 12px;
`;
