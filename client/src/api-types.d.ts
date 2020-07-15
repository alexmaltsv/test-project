export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type APIColumn = {
  id: Scalars['ID'];
  title: Scalars['String'];
  position: Scalars['Int'];
  issues: Array<APIIssue>;
  dashboardId: Scalars['String'];
};

export type APIColumnInput = {
  title: Scalars['String'];
  position: Scalars['Int'];
  dashboardId: Scalars['String'];
};

export type APIColumnPatchInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
};

export type APIDashboard = {
  id: Scalars['ID'];
  title: Scalars['String'];
  columns: Array<APIColumn>;
  issues: Array<APIIssue>;
};

export type APIDashboardInput = {
  title: Scalars['String'];
};

export type APIDeleteResponse = {
  id: Scalars['ID'];
};

export type APIIssue = {
  id: Scalars['ID'];
  title: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  position: Scalars['Int'];
  updatedAt: Scalars['String'];
  createdAt: Scalars['String'];
  dashboardId: Scalars['ID'];
  columnId: Scalars['ID'];
};

export type APIIssueAddInput = {
  title: Scalars['String'];
  columnId: Scalars['String'];
  dashboardId: Scalars['String'];
};

export type APIIssuePatchInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  columnId?: Maybe<Scalars['ID']>;
};

export type APIMutation = {
  columnAdd?: Maybe<APIColumn>;
  columnPatch?: Maybe<APIColumn>;
  columnRemove?: Maybe<APIDeleteResponse>;
  dashboardAdd?: Maybe<APIDashboard>;
  issueAdd?: Maybe<APIIssue>;
  issuePatch?: Maybe<APIIssue>;
  issueRemove?: Maybe<APIDeleteResponse>;
};


export type APIMutationColumnAddArgs = {
  column: APIColumnInput;
};


export type APIMutationColumnPatchArgs = {
  column: APIColumnPatchInput;
};


export type APIMutationColumnRemoveArgs = {
  id: Scalars['String'];
};


export type APIMutationDashboardAddArgs = {
  dashboard: APIDashboardInput;
};


export type APIMutationIssueAddArgs = {
  issue: APIIssueAddInput;
};


export type APIMutationIssuePatchArgs = {
  issue: APIIssuePatchInput;
};


export type APIMutationIssueRemoveArgs = {
  id: Scalars['String'];
};

export type APIQuery = {
  columns?: Maybe<Array<Maybe<APIColumn>>>;
  dashboard: APIDashboard;
  dashboards: Array<APIDashboard>;
  issue: APIIssue;
};


export type APIQueryDashboardArgs = {
  id: Scalars['String'];
};


export type APIQueryIssueArgs = {
  id: Scalars['String'];
};


