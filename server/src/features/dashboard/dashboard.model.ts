import * as mongoose from "mongoose";
import { APIDashboard as DashboardEntity } from "../../graphql";

type DashboardDoc = mongoose.Document & DashboardEntity;

type DashboardModel = mongoose.Model<DashboardDoc> & {
  build(attrs: Partial<DashboardEntity>): DashboardDoc;
};

const dashboardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

dashboardSchema.statics.build = (attrs: Partial<DashboardEntity>) => {
  return new Dashboard(attrs);
};

const Dashboard = mongoose.model<DashboardDoc, DashboardModel>("Dashboard", dashboardSchema);

export { Dashboard };
