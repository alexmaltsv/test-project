import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Draggable } from 'react-beautiful-dnd';
import { APIIssue } from 'api-types';
import { useDashboardParams } from 'features/dashboard';
import { IssueDelete } from './Issue.styled';
import { useIssueRemove } from './hooks';
import IssueContainer from './components/IssueContainer';
import ROUTES from '../../shared/routes';

type IssueProps = {
  issue: APIIssue;
  index: number;
};

const Issue = ({ issue, index }: IssueProps) => {
  const { dashboardId } = useDashboardParams();
  const [remove] = useIssueRemove({ dashboardId, columnId: issue.columnId });
  const { push } = useHistory();

  const handleClick = () => {
    push(ROUTES.issue(dashboardId, issue.id));
  };

  const handleClickDelete = (event: MouseEvent) => {
    event.stopPropagation();
    remove({ variables: { id: issue.id } });
  };

  return (
    <Draggable
      draggableId={issue.id}
      index={index}
    >
      {(dragProvided) => (
        <IssueContainer
          ref={dragProvided.innerRef}
          onClick={handleClick}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
        >
          {issue.title}

          <IssueDelete>
            <IconButton
              size="small"
              onClick={handleClickDelete}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </IssueDelete>
        </IssueContainer>
      )}
    </Draggable>
  );
};

export default Issue;
