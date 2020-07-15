import { columnRepository } from "./column.repository";
import { issueRepository } from "../issue";
import {
  APIMutationColumnAddArgs,
  APIMutationColumnPatchArgs,
  APIMutationColumnRemoveArgs,
} from "../../graphql";

const columnResolvers = {
  Column: {
    issues: async (column) => {
      return issueRepository.listByColumnId(column.id);
    },
  },

  Query: {
    columns: async (_) => {
      return columnRepository.list();
    },
  },

  Mutation: {
    columnAdd: async (_, { column }: APIMutationColumnAddArgs) => {
      // TODO: Add validation?
      const res = await columnRepository.create(column);
      return res;
    },

    columnPatch: async (_, { column }: APIMutationColumnPatchArgs) => {
      const result = columnRepository.patch(column);

      if (!result) {
        throw new Error(`Column with id=${column.id} not found`);
      }

      return result;
    },

    columnRemove: async (_, { id }: APIMutationColumnRemoveArgs) => {
      return columnRepository.remove(id);
    },
  },
};

export { columnResolvers };
