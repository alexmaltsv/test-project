import { dashboardRepository } from "./dashboard.repository";
import { columnRepository } from "../column";
import { APIDashboard, APIMutationDashboardAddArgs, APIQueryDashboardArgs } from "../../graphql";
import { issueRepository } from "../issue";

export const dashboardResolvers = {
  Dashboard: {
    columns: async (dashboard: APIDashboard) => {
      return columnRepository.listByDashboardId(dashboard.id);
    },

    issues: async (dashboard: APIDashboard) => {
      return issueRepository.listByDashboardId(dashboard.id);
    },
  },

  Query: {
    dashboards: async (_) => dashboardRepository.list(),

    dashboard: async (_, { id }: APIQueryDashboardArgs) => {
      const res = await dashboardRepository.get(id);

      if (!res) {
        throw Error(`Dashboard with id=${id} not found`);
      }

      return res;
    },
  },
  Mutation: {
    dashboardAdd: async (_, { dashboard }: APIMutationDashboardAddArgs) => {
      // TODO: Add validation?
      return dashboardRepository.create(dashboard);
    },
  },
};
