import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Field, Form } from 'react-final-form';
import { Box, Button, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDashboardParams } from 'features/dashboard';
import { useIssueAdd } from '../hooks';
import IssueContainer from './IssueContainer';
import { IssueAddFooter, IssueAddForm } from './IssueAdd.styled';

type IssueAddProps = {
  columnId: string;
};

type IssueAddFormData = {
  columnId: string;
  dashboardId: string;
  title: string;
};

const IssueAdd = ({ columnId }: IssueAddProps) => {
  const [edit, setEdit] = useState(false);
  const refContainer = useRef<any>();
  const { dashboardId } = useDashboardParams();
  const [add, { error }] = useIssueAdd({ dashboardId });

  useClickAway(
    refContainer,
    () => {
      if (edit) {
        setEdit(false);
      }
    },
  );

  const handleEdit = () => {
    setEdit(true);
  };

  const onSubmit = (issue: IssueAddFormData) => {
    add({ variables: { issue } }).then(() => {
      setEdit(false);
    });
  };

  return (
    <IssueContainer
      ref={refContainer}
      onClick={handleEdit}
    >
      {edit && (
        <Form
          initialValues={{ columnId, dashboardId }}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <IssueAddForm onSubmit={handleSubmit}>
              <Field name="title">
                {({ input }) => (
                  <TextField
                    {...input}
                    required
                    autoFocus
                  />
                )}
              </Field>

              {error && (
                <Box mt={2}>
                  <Alert severity="error">{error.message}</Alert>
                </Box>
              )}

              <IssueAddFooter>
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Create
                </Button>
              </IssueAddFooter>
            </IssueAddForm>
          )}
        </Form>
      )}

      {!edit && '+ Add issue'}
    </IssueContainer>
  );
};

export default IssueAdd;
