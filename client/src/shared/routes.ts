const ROUTES = {
  root: () => '/',
  dashboard: (dashboardId = ':dashboardId') => `/dashboard/${dashboardId}`,
  issue: (dashboardId = ':dashboardId', issueId = ':issueId') => `/dashboard/${dashboardId}/${issueId}`,
};

export default ROUTES;
