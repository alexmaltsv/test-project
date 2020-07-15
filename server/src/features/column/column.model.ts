import * as mongoose from "mongoose";
import { APIColumn as ColumnEntity } from "../../graphql";

type ColumnDoc = mongoose.Document & ColumnEntity;

type ColumnModel = mongoose.Model<ColumnDoc> & {
  build(attrs: Partial<ColumnEntity>): ColumnDoc;
};

const columnSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 0,
      required: false,
    },
    issueIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
    dashboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dashboard",
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

columnSchema.statics.build = (attrs: Partial<ColumnEntity>) => {
  return new Column(attrs);
};

const Column = mongoose.model<ColumnDoc, ColumnModel>("Column", columnSchema);

export { Column };
