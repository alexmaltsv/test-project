import { APIDashboard } from 'api-types';

export const move = <T extends { id: string }>(
  arr: Array<T>,
  prevIndex: number,
  nextIndex: number,
) => {
  const deleted = arr.splice(prevIndex, 1);
  arr.splice(nextIndex, 0, deleted[0]);
  return arr;
};

export const moveIssuesBetweenColumns = (
  dashboard: APIDashboard,
  {
    prevColumnId,
    nextColumnId,
    issueNextIndex,
    issuePrevIndex,
  }: {
    prevColumnId: string,
    nextColumnId: string,
    issuePrevIndex: number,
    issueNextIndex: number,
  },
) => {
  const prevColumnIndex = dashboard.columns.findIndex((col) => col.id === prevColumnId);
  const nextColumnIndex = dashboard.columns.findIndex((col) => col.id === nextColumnId);

  const prevColumn = dashboard.columns[prevColumnIndex];
  const nextColumn = dashboard.columns[nextColumnIndex];

  const deleted = prevColumn.issues.splice(issuePrevIndex, 1);
  nextColumn.issues.splice(issueNextIndex, 0, deleted[0]);
};

export const moveIssuesInColumn = (
  dashboard: APIDashboard,
  {
    columnId,
    prevIndex,
    nextIndex,
  }: {
    prevIndex: number,
    nextIndex: number,
    columnId: string
  },
) => {
  const columnIndex = dashboard.columns.findIndex((col) => col.id === columnId);
  const column = dashboard.columns[columnIndex];
  const issues = column?.issues;

  move(issues!, prevIndex, nextIndex);
};
