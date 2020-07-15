import * as mongoose from "mongoose";
import { APIIssue as IssueEntity } from "../../graphql";

type IssueDoc = mongoose.Document & IssueEntity;

type IssueModel = mongoose.Model<IssueDoc> & {
  build(attrs: Partial<IssueEntity>): IssueDoc;
};

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    position: {
      type: String,
      default: 0,
      required: false,
    },
    columnId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Column",
    },
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

issueSchema.statics.build = (attrs: Partial<IssueEntity>) => {
  return new Issue(attrs);
};

const Issue = mongoose.model<IssueDoc, IssueModel>("Issue", issueSchema);

export { Issue };
