import { gql } from 'graphql.macro';
import { APIIssue, APIIssueAddInput, APIIssuePatchInput } from 'api-types';

export type IssueAddResponse = { issue: Pick<APIIssue, 'id' | 'title'>; };
export type IssueAddInput = { issue: APIIssueAddInput; };
export const ISSUE_ADD_MUTATION = gql`
  mutation IssueAdd($issue: IssueAddInput!) {
    issueAdd(issue: $issue) {
      id,
      title,
      columnId
    }
  }
`;

export type IssuePatchResponse = { issue: Pick<APIIssue, 'id' | 'title'>; };
export type IssuePatchInput = { issue: APIIssuePatchInput };
export const ISSUE_PATCH_MUTATION = gql`
  mutation IssuePatch($issue: IssuePatchInput!) {
    issuePatch(issue: $issue) {
      id,
      title,
    }
  }
`;

export type IssueRemoveResponse = any;
export type IssueRemoveInput = { id: string };
export const ISSUE_REMOVE_MUTATION = gql`
  mutation IssueRemove($id: String!) {
      issueRemove(id: $id) {
          id
      }
  }
`;

export type IssueFetchResponse = { issue: APIIssue };
export type IssueFetchInput = { id: string };
export const ISSUE_FETCH = gql`
  query IssueFetch($id: String!) {
      issue(id: $id) {
          id
          title
          description,
          createdAt,
          updatedAt
      }
  }
`;
