import React from 'react';
import {
  CircularProgress,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Alert,
} from '@material-ui/lab';
import dayjs from 'dayjs';
import { Form, Field } from 'react-final-form';
import { useDashboardParams } from 'features/dashboard';
import { ISSUE_DATE_FORMAT } from 'features/issue/constants';
import {
  IssueDetailsAbout,
  IssueDetailsField,
  IssueDetailsFooter,
  IssueDetailsForm,
} from './IssueDetails.styled';
import { useIssuesFetch, useIssuesPatch } from '../hooks';

type IssueDetailsProps = {
  id: string;
};

type IssueDetailsFormData = {
  title: string;
  description: string | null;
  id: string;
};

const IssueDetails = ({ id }: IssueDetailsProps) => {
  const { data, error, loading } = useIssuesFetch(id);
  const { dashboardId } = useDashboardParams();
  const issue = data?.issue;

  const [patch, { data: patchData, error: patchError }] = useIssuesPatch({ dashboardId });

  const submit = (fd: IssueDetailsFormData) => {
    patch({ variables: { issue: fd } });
  };

  return (
    <Form
      initialValues={{ id, title: issue?.title, description: issue?.description }}
      onSubmit={submit}
    >
      {({ handleSubmit }) => (
        <IssueDetailsForm onSubmit={handleSubmit}>
          {loading && (
            <CircularProgress />
          )}

          {error && error.message}

          {!loading && !issue && (
            <div>Issue not found</div>
          )}

          {issue && (
            <>
              <IssueDetailsField>
                <Field name="title">
                  {({ input, meta }) => (
                    <TextField
                      {...input}
                      fullWidth
                      required
                      label="Title"
                      error={meta.error}
                    />
                  )}
                </Field>
              </IssueDetailsField>

              <IssueDetailsAbout>
                <Typography variant="subtitle2">About:</Typography>
                <Typography variant="body2">
                  Date created:
                  {' '}
                  {dayjs(+issue.createdAt).format(ISSUE_DATE_FORMAT)}
                </Typography>
                <Typography variant="body2">
                  Last update:
                  {' '}
                  {dayjs(+issue.updatedAt).format(ISSUE_DATE_FORMAT)}
                </Typography>
              </IssueDetailsAbout>

              <IssueDetailsField>
                <Field name="description">
                  {({ input }) => (
                    <TextField
                      {...input}
                      fullWidth
                      variant="outlined"
                      label="Description"
                      multiline
                      rows={5}
                    />
                  )}
                </Field>
              </IssueDetailsField>

              {patchData && (
                <Alert severity="success">Changes successfully made</Alert>
              )}

              {patchError && (
                <Alert severity="error">{patchError}</Alert>
              )}

              <IssueDetailsFooter>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </IssueDetailsFooter>
            </>
          )}
        </IssueDetailsForm>
      )}
    </Form>
  );
};

export default IssueDetails;
