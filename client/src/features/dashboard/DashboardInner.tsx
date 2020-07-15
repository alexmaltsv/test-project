import React from 'react';
import { useTitle } from 'react-use';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { DroppableProvided } from 'react-beautiful-dnd';
import {
  CircularProgress,
  IconButton,
  Typography,
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TITLES from 'shared/titles';
import { useDashboardFetch } from 'features/dashboard/hooks';
import ROUTES from 'shared/routes';
import Column, { ColumnAdd } from 'features/column';
import { DashboardParams } from './types';
import {
  DashboardColumns,
  DashboardHeader,
  DashboardHeaderTitle,
  DashboardSpacing,
  DashboardStyled,
} from './Dashboard.styled';

type DashboardInnerProps = {
  provided: DroppableProvided;
};

const DashboardInner = ({ provided } : DashboardInnerProps) => {
  const { dashboardId } = useParams<DashboardParams>();
  const { data, loading, error } = useDashboardFetch({ dashboardId });

  useTitle(TITLES.dashboard(data?.dashboard.title || ''));

  if (loading) {
    return (<CircularProgress />);
  }

  if (!data) {
    return (<div>Not found dashboard</div>);
  }

  if (error) {
    return (<div>{error && error.message}</div>);
  }

  const { dashboard } = data;

  return (
    <DashboardStyled>
      <DashboardHeader>
        <Link to={ROUTES.root()}>
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </Link>

        <DashboardHeaderTitle>
          <Typography variant="h3">
            {dashboard.title}
          </Typography>
        </DashboardHeaderTitle>
      </DashboardHeader>

      <DashboardSpacing />

      <DashboardColumns
        ref={provided.innerRef}
        {...provided.droppableProps}
      >
        {dashboard.columns.map(
          (column, index) => (
            <Column
              index={index}
              key={column.id}
              column={column}
            />
          ),
        )}

        {provided.placeholder}

        <ColumnAdd index={dashboard.columns.length} />
      </DashboardColumns>
    </DashboardStyled>
  );
};

export default DashboardInner;
