import { useMutation, useQuery } from '@apollo/react-hooks';
import { DASHBOARD_FETCH_QUERY } from 'features/dashboard/typedefs';
import {
  ISSUE_ADD_MUTATION,
  ISSUE_FETCH,
  ISSUE_PATCH_MUTATION,
  ISSUE_REMOVE_MUTATION,
  IssueAddInput,
  IssueAddResponse,
  IssueFetchInput,
  IssueFetchResponse,
  IssuePatchInput,
  IssuePatchResponse,
  IssueRemoveInput,
  IssueRemoveResponse,
} from './typedefs';

export const useIssuesFetch = (id: string) => useQuery<IssueFetchResponse, IssueFetchInput>(
  ISSUE_FETCH,
  { variables: { id } },
);

export const useIssuesPatch = () => useMutation<IssuePatchResponse, IssuePatchInput>(
  ISSUE_PATCH_MUTATION,
);

type UseIssueRemoveProps = { dashboardId: string; columnId: string };
export const useIssueRemove = (
  { dashboardId }: UseIssueRemoveProps,
) => useMutation<IssueRemoveResponse, IssueRemoveInput>(
  ISSUE_REMOVE_MUTATION,
  { refetchQueries: [{ query: DASHBOARD_FETCH_QUERY, variables: { id: dashboardId } }] },
);

type UseIssueAddProps = { dashboardId: string; };
export const useIssueAdd = (
  { dashboardId }: UseIssueAddProps,
) => useMutation<IssueAddResponse, IssueAddInput>(
  ISSUE_ADD_MUTATION,
  { refetchQueries: [{ query: DASHBOARD_FETCH_QUERY, variables: { id: dashboardId } }] },
);
