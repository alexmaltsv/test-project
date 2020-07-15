import { Issue } from "./issue.model";
import { columnRepository } from "../column";
import { addPositionToSortedArray } from "../../utils/addPositionToSortedArray";
import { APIIssue, APIIssueAddInput, APIIssuePatchInput } from "../../graphql";

class IssueRepository {
  get = async (id: string) => {
    return Issue.findById(id);
  };

  list = async () => {
    return Issue.find({}).sort("position");
  };

  listByColumnId = async (id: string) => {
    return Issue.find({ columnId: id }).sort("position");
  };

  listByDashboardId = async (id: string) => {
    return Issue.find({ dashboardId: id });
  };

  create = async (fd: APIIssueAddInput) => {
    const issue = Issue.build(fd);
    await issue.save();

    return issue;
  };

  remove = async (id: string) => {
    return Issue.findByIdAndRemove(id);
  };

  patch = async (fd: APIIssuePatchInput) => {
    const issue = await this.get(fd.id);

    if (!issue) {
      return null;
    }

    if (
      typeof fd.position === "number" &&
      fd.columnId &&
      issue.columnId.toString() !== fd.columnId
    ) {
      const prevColumnIssues = await this.listByColumnId(issue.columnId);
      const nextColumnIssues = await this.listByColumnId(fd.columnId);

      const prevIndex = prevColumnIssues.findIndex(({ id }) => id === fd.id)!;
      const deleted = prevColumnIssues.splice(prevIndex, 1);

      nextColumnIssues.splice(fd.position, 0, deleted[0]);

      addPositionToSortedArray(prevColumnIssues);
      addPositionToSortedArray(nextColumnIssues);
    } else if (typeof fd.position === "number" && fd.columnId) {
      const column = await columnRepository.get(fd.columnId);

      if (!column) {
        throw Error("Related column not found");
      }

      const issues = await Issue.find({ columnId: fd.columnId }).sort("position");
      const prevIndex = issues.findIndex(({ id }) => id === fd.id)!;
      const deleted = issues.splice(prevIndex, 1);

      issues.splice(fd.position, 0, deleted[0]);

      addPositionToSortedArray(issues);
    }

    await issue.updateOne(fd);

    return issue;
  };
}

const issueRepository = new IssueRepository();

export { issueRepository };
