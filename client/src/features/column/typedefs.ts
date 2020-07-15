import { gql } from 'graphql.macro';
import { APIColumn, APIColumnInput, APIColumnPatchInput } from 'api-types';

export type ColumnAddResponse = { column: APIColumn; };
export type ColumnAddInput = { column: APIColumnInput };
export const COLUMN_ADD_MUTATION = gql`
  mutation ColumnAdd($column: ColumnInput!) {
    columnAdd(column: $column) {
      id
      title
    }
  }
`;

export type ColumnPatchResponse = { column: { id: string; title: string }};
export type ColumnPatchInput = { column: APIColumnPatchInput };
export const COLUMN_PATCH_MUTATION = gql`
  mutation ColumnAdd($column: ColumnPatchInput!) {
    columnPatch(column: $column) {
      id
      title
    }
  }
`;

export type ColumnDeleteInput = { id: string };
export const COLUMN_DELETE_MUTATION = gql`
  mutation ColumnDelete($id: String!) {
    columnRemove(id: $id) {
      id
    }
  }
`;
