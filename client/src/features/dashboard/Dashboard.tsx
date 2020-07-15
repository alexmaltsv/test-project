import React from 'react';
import { useParams } from 'react-router';
import { useApolloClient } from '@apollo/react-hooks';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useColumnPatch } from 'features/column';
import { useIssuesPatch } from 'features/issue';
import { DashboardDnDTypes } from './constants';
import DashboardInner from './DashboardInner';
import { DASHBOARD_FETCH_QUERY, DashboardQueryResponse } from './typedefs';
import { DashboardParams } from './types';
import { moveIssuesBetweenColumns, moveIssuesInColumn, move } from './utils';

export const Dashboard = () => {
  const { dashboardId } = useParams<DashboardParams>();
  const client = useApolloClient();

  const [issuePatch] = useIssuesPatch();
  const [columnPatch] = useColumnPatch();

  const handleDragEnd = (result: DropResult) => {
    const data = client.readQuery<DashboardQueryResponse>({
      query: DASHBOARD_FETCH_QUERY,
      variables: { id: dashboardId },
    });
    const dashboard = data!.dashboard!;

    if (!result.destination) {
      return;
    }

    if (result.type === DashboardDnDTypes.issue) {
      const prevColumnId = result.source.droppableId;
      const nextColumnId = result.destination?.droppableId;

      const prevIndex = result.source.index;
      const nextIndex = result.destination!.index;

      // move issue in one column
      if (prevColumnId === nextColumnId) {
        moveIssuesInColumn(
          dashboard,
          {
            prevIndex,
            nextIndex,
            columnId: prevColumnId,
          },
        );
      } else if (nextColumnId) {
        // move issue between columns
        moveIssuesBetweenColumns(
          dashboard,
          {
            prevColumnId,
            nextColumnId,
            issuePrevIndex: prevIndex,
            issueNextIndex: nextIndex,
          },
        );
      }

      issuePatch({
        variables: {
          issue: { id: result.draggableId, position: nextIndex, columnId: nextColumnId },
        },
      });
    }

    if (result.type === DashboardDnDTypes.column && result.destination) {
      const prevColumnIndex = result.source.index;
      const nextColumnIndex = result.destination?.index;

      move(dashboard.columns, prevColumnIndex, nextColumnIndex);

      columnPatch({
        variables: { column: { id: result.draggableId, position: nextColumnIndex } },
      });
    }

    client.writeQuery({
      query: DASHBOARD_FETCH_QUERY,
      variables: { id: dashboardId },
      data,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable
        droppableId="board"
        type={DashboardDnDTypes.column}
        direction="horizontal"
      >
        {(provided) => (
          <DashboardInner provided={provided} />
        )}
      </Droppable>
    </DragDropContext>
  );
};
