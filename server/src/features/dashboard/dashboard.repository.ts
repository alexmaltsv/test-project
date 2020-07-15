import { Dashboard } from "./dashboard.model";
import { APIDashboard, APIDashboardInput } from "../../graphql";

class DashboardRepository {
  get = async (id: string) => {
    return Dashboard.findById(id);
  };

  list = async () => {
    const dashboards = await Dashboard.find({});
    return dashboards;
  };

  create = async (fd: APIDashboardInput) => {
    const dashboard = Dashboard.build(fd);
    await dashboard.save();
    return dashboard;
  };
}

const dashboardRepository = new DashboardRepository();

export { dashboardRepository };
