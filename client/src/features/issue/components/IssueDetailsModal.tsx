import React from 'react';
import { Dialog } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDashboardParams } from 'features/dashboard';
import ROUTES from 'shared/routes';
import { IssueDetailsModalStyled } from './IssueDetailsModal.styled';
import IssueDetails from './IssueDetails';

const IssueDetailsModal = () => {
  const { issueId, dashboardId } = useDashboardParams();
  const { push } = useHistory();

  const handleClose = () => {
    push(ROUTES.dashboard(dashboardId));
  };

  return (
    <Dialog
      open
      onClose={handleClose}
    >
      <IssueDetailsModalStyled>
        <IssueDetails id={issueId!} />
      </IssueDetailsModalStyled>
    </Dialog>
  );
};

export default IssueDetailsModal;
