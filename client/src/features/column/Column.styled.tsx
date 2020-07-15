import styled from 'styled-components/macro';

export const ColumnStyled = styled.div`
  width: 280px;
  flex: none;
  margin-right: 20px;
  
  &:last-child {
    margin-right: 0;
  }
`;

export const ColumnTitle = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
`;

export const ColumnSpacing = styled.div`
    margin-top: 12px;
`;
