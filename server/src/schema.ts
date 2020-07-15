import "graphql-import-node";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs } from "@graphql-tools/merge";
import merge from "lodash/merge";
import * as typeDefs from "./global.graphql";

import { columnResolvers, columnTypeDefs } from "./features/column";
import { dashboardResolvers, dashboardTypeDefs } from "./features/dashboard";
import { issueTypeDefs, issueResolvers } from "./features/issue";

const mergedTypes = mergeTypeDefs([
  typeDefs,
  columnTypeDefs,
  dashboardTypeDefs,
  issueTypeDefs
]);

export const schema = makeExecutableSchema({
  typeDefs: mergedTypes,
  resolvers: merge(
    issueResolvers,
    columnResolvers,
    dashboardResolvers,
  ),
});
