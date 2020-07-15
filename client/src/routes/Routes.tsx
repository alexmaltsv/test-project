import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ROUTES from 'shared/routes';
import { Dashboard, DashboardList } from 'features/dashboard';
import { IssueDetailsModal } from 'features/issue';
import Layout from 'сomponents/Layout';

const Routes = () => (
  <Layout>
    <Route
      path={ROUTES.issue()}
      component={IssueDetailsModal}
    />

    <Switch>
      <Route
        path={ROUTES.dashboard()}
        component={Dashboard}
      />

      <Route
        path={ROUTES.root()}
        component={DashboardList}
        exact
      />

      <Route
        path="*"
        component={() => <div>Page not found</div>}
      />
    </Switch>
  </Layout>
);

export default Routes;
