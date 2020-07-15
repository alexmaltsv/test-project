import { useParams } from 'react-router';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  DASHBOARD_ADD_MUTATION,
  DASHBOARD_FETCH_QUERY,
  DASHBOARDS_FETCH_QUERY,
  DashboardAddInput,
  DashboardAddResponse,
  DashboardQueryResponse,
  DashboardQueryVariables, DashboardsQueryResponse,
} from 'features/dashboard/typedefs';
import { DashboardParams } from './types';

export const useDashboardParams = () => useParams<DashboardParams>();

type UseDashboardFetchParams = { dashboardId: string };
export const useDashboardFetch = ({ dashboardId }: UseDashboardFetchParams) => useQuery<
DashboardQueryResponse,
DashboardQueryVariables
>(
  DASHBOARD_FETCH_QUERY,
  { variables: { id: dashboardId } },
);

export const useDashboardsFetch = () => useQuery<DashboardsQueryResponse>(DASHBOARDS_FETCH_QUERY);

export const useDashboardAdd = () => useMutation<DashboardAddResponse, DashboardAddInput>(
  DASHBOARD_ADD_MUTATION,
  { refetchQueries: [{ query: DASHBOARDS_FETCH_QUERY }] },
);
