import { issueRepository } from "./issue.repository";
import {
  APIMutationIssueAddArgs,
  APIMutationIssuePatchArgs,
  APIMutationIssueRemoveArgs,
  APIQueryIssueArgs,
} from "../../graphql";

export const issueResolvers = {
  Query: {
    issue: async (_, { id }: APIQueryIssueArgs) => {
      const result = await issueRepository.get(id);

      if (!result) {
        throw new Error(`Issue with id=${id} not found`);
      }

      return result;
    },
  },
  Mutation: {
    issueAdd: async (_, { issue }: APIMutationIssueAddArgs) => issueRepository.create(issue),

    issuePatch: async (_, { issue }: APIMutationIssuePatchArgs) => {
      const item = await issueRepository.patch(issue);

      if (!item) {
        throw new Error(`Issue with id=${issue.id} not found`);
      }

      return item;
    },

    issueRemove: async (_, { id }: APIMutationIssueRemoveArgs) => issueRepository.remove(id),
  },
};
