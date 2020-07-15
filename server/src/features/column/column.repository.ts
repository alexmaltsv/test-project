import { Column } from "./column.model";
import { APIColumn, APIColumnInput, APIColumnPatchInput } from "../../graphql";

// TODO: Remove issues from db;
class ColumnRepository {
  get = async (id: string) => {
    return Column.findById(id);
  };

  list = async () => {
    return Column.find({}).sort("position");
  };

  listByDashboardId = async (id: string) => {
    return Column.find({ dashboardId: id }).sort("position");
  };

  create = async (fd: APIColumnInput) => {
    const column = Column.build(fd);
    await column.save();
    return column;
  };

  remove = async (id: string) => {
    // TODO: deprecated
    return Column.findByIdAndRemove(id);
  };

  patch = async (fd: APIColumnPatchInput) => {
    const column = await this.get(fd.id);

    if (!column) {
      return null;
    }

    if (typeof fd.position === "number") {
      const columns = await this.listByDashboardId(column.dashboardId);
      const prevIndex = columns.findIndex(({ id }) => id === fd.id)!;
      const deleted = columns.splice(prevIndex, 1);
      columns.splice(fd.position, 0, deleted[0]);

      columns.map((iss, index) => {
        iss.position = index;
        iss.save();
      });
    }

    await column.updateOne(fd);

    return column;
  };
}

const columnRepository = new ColumnRepository();

export { columnRepository };
