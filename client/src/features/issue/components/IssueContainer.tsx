import React, { forwardRef, ReactNode, Ref } from 'react';
import { Paper } from '@material-ui/core';
import { IssueStyled } from 'features/issue/Issue.styled';
import { IssueContainerText } from 'features/issue/components/IssueContainer.styled';

type IssueContainerProps = {
  children: ReactNode;
  onClick?: () => void;
};

const IssueContainer = forwardRef((
  { children, ...rest }: IssueContainerProps,
  ref: Ref<HTMLDivElement>,
) => (
  <IssueStyled
    ref={ref}
    {...rest}
  >
    <Paper>
      <IssueContainerText>
        {children}
      </IssueContainerText>
    </Paper>
  </IssueStyled>
));

export default IssueContainer;
