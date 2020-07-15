import React from 'react';
import Issue, { IssueAdd } from 'features/issue';
import { APIColumn } from 'api-types';
import { IconButton, Typography } from '@material-ui/core';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import DeleteIcon from '@material-ui/icons/Delete';
import { ColumnStyled, ColumnTitle } from 'features/column/Column.styled';
import { useColumnRemove } from 'features/column';
import { useDashboardParams, DashboardDnDTypes } from 'features/dashboard';

type ColumnProps = {
  column: APIColumn;
  index: number;
};

const Column = ({ column, index }: ColumnProps) => {
  const { dashboardId } = useDashboardParams();
  const [remove] = useColumnRemove({ dashboardId });

  const handleClickDelete = () => {
    remove({ variables: { id: column.id } });
  };

  return (
    <Draggable
      draggableId={column.id}
      index={index}
    >
      {(provided) => (
        <ColumnStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <ColumnTitle {...provided.dragHandleProps}>
            <Typography variant="h6">
              {column.title}
            </Typography>

            <div>
              <IconButton
                size="small"
                onClick={handleClickDelete}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          </ColumnTitle>

          <IssueAdd columnId={column.id} />

          <Droppable
            type={DashboardDnDTypes.issue}
            direction="vertical"
            droppableId={column.id}
          >
            {(dropProvided) => (
              <>
                <div
                  {...dropProvided.droppableProps}
                  ref={dropProvided.innerRef}
                >
                  {column.issues?.map((issue, issueIndex) => (
                    <Issue
                      key={issue.id}
                      issue={issue}
                      index={issueIndex}
                    />
                  ))}
                </div>

                {dropProvided.placeholder}
              </>
            )}
          </Droppable>
        </ColumnStyled>
      )}
    </Draggable>
  );
};

export default Column;
