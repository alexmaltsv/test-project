import styled from 'styled-components/macro';
import theme from 'сomponents/theme';

export const ColumndAddLink = styled.span`
  cursor: pointer;
  display: inline-flex;
  white-space: nowrap;
  padding: 0 12px;
  
  &:hover {
    color: ${theme.palette.primary.light}
  }
`;

export const ColumndAddForm = styled.form`
    display: flex;
    flex-direction: column;
`;

export const ColumnAddFooter = styled.div`
  margin-top: 12px;
`;
