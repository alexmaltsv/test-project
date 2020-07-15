import { gql } from 'graphql.macro';
import { APIDashboard, APIDashboardInput } from 'api-types';

export type DashboardQueryResponse = { dashboard: APIDashboard; };
export type DashboardQueryVariables = { id: string; };
export const DASHBOARD_FETCH_QUERY = gql`
  query Dashboard($id: String!) {
    dashboard(id: $id) {
      id,
      title,
      columns {
        id,
        title,
        issues {
          id,
          title,
          createdAt,
          columnId,
        }
      }
    }
  }
`;

export type DashboardsQueryResponse = { dashboards: APIDashboard[]; };
export const DASHBOARDS_FETCH_QUERY = gql`
  query Dashboards {
    dashboards {
      id,
      title,
    }
  }
`;

export type DashboardAddResponse = { dashboard: { id: string; title: string }};
export type DashboardAddInput = { dashboard: APIDashboardInput };
export const DASHBOARD_ADD_MUTATION = gql`
  mutation DashboardAdd($dashboard: DashboardInput!) {
    dashboardAdd(dashboard: $dashboard) {
      title,
    }
  }
`;
