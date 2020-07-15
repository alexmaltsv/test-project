import React, { ComponentType, ReactNode } from 'react';
import styled from 'styled-components/macro';

type LayoutProps = {
  children: ReactNode;
  BodyComponent?: ComponentType<any>;
};

const LayoutStyled = styled.div`
    display: flex;
    flex: 1;
    min-width: 1240px;
    min-height: 100%;
    padding: 30px 24px;
`;

const Layout = (
  {
    children,
  }: LayoutProps,
) => (
  <LayoutStyled>
    {children}
  </LayoutStyled>
);

export default Layout;
