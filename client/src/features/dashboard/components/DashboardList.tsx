import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTitle } from 'react-use';
import ROUTES from 'shared/routes';
import TITLES from 'shared/titles';
import { useDashboardsFetch } from 'features/dashboard';
import DashboardAdd from './DashboardAdd';
import { DashboardListItem, DashboardListStyled } from './DashboardList.styled';

export const DashboardList = () => {
  const { loading, error, data } = useDashboardsFetch();
  useTitle(TITLES.dashboards());

  if (loading) {
    return (<CircularProgress />);
  }

  if (error) {
    return <>{error.message}</>;
  }

  const { dashboards } = data!;

  return (
    <DashboardListStyled>
      {dashboards.length ? dashboards.map((dashboard) => (
        <Link
          key={dashboard.id}
          to={ROUTES.dashboard(dashboard.id)}
        >
          <DashboardListItem>
            {dashboard.title}
          </DashboardListItem>
        </Link>
      )) : (
        <DashboardListItem>Dashboards not found</DashboardListItem>
      )}
      <DashboardAdd />
    </DashboardListStyled>
  );
};
