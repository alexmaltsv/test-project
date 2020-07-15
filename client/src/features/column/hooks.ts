import { useMutation } from '@apollo/react-hooks';
import { DASHBOARD_FETCH_QUERY } from 'features/dashboard/typedefs';
import {
  COLUMN_ADD_MUTATION,
  COLUMN_DELETE_MUTATION, COLUMN_PATCH_MUTATION,
  ColumnAddInput,
  ColumnAddResponse,
  ColumnDeleteInput, ColumnPatchInput, ColumnPatchResponse,
} from './typedefs';

type UseColumnRemoveProps = { dashboardId: string; };
export const useColumnRemove = (
  { dashboardId }: UseColumnRemoveProps,
) => useMutation<void, ColumnDeleteInput>(
  COLUMN_DELETE_MUTATION,
  { refetchQueries: [{ query: DASHBOARD_FETCH_QUERY, variables: { id: dashboardId } }] },
);

type UseColumnAddProps = { dashboardId: string };
export const useColumnAdd = (
  { dashboardId }: UseColumnAddProps,
) => useMutation<ColumnAddResponse, ColumnAddInput>(
  COLUMN_ADD_MUTATION,
  {
    refetchQueries: [{ query: DASHBOARD_FETCH_QUERY, variables: { id: dashboardId } }],
  },
);

export const useColumnPatch = () => useMutation<ColumnPatchResponse, ColumnPatchInput>(
  COLUMN_PATCH_MUTATION,
);
