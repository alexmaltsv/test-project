import React, { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Box, Button, TextField } from '@material-ui/core';
import { useClickAway } from 'react-use';
import { useDashboardAdd } from 'features/dashboard/hooks';
import { Alert } from '@material-ui/lab';
import {
  DashboardAddForm,
  DashboardAddFormFooter,
} from './DashboardAdd.styled';
import { DashboardListItem } from './DashboardList.styled';

type APIDashboardFormData = {
  title: string;
};

const DashboardAdd = () => {
  const [add, { error }] = useDashboardAdd();
  const [edit, setEdit] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);

  useClickAway(
    refContainer,
    () => {
      if (edit) {
        setEdit(false);
      }
    },
  );

  const handleEdit = () => setEdit(true);

  const submit = (dashboard: APIDashboardFormData) => {
    add({ variables: { dashboard } }).then(
      () => setEdit(false),
    );
  };

  return (
    <DashboardListItem onClick={handleEdit}>
      {!edit ? '+ Add dashboard' : (
        <Form onSubmit={submit}>
          {({ handleSubmit }) => (
            <DashboardAddForm onSubmit={handleSubmit}>
              <Field
                name="title"
                label="Title"
              >
                {({ input }) => (
                  <TextField
                    {...input}
                    autoFocus
                    required
                  />
                )}
              </Field>

              {error && (
                <Box mt={2}>
                  <Alert severity="error">{error.message}</Alert>
                </Box>
              )}

              <DashboardAddFormFooter>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </DashboardAddFormFooter>
            </DashboardAddForm>
          )}
        </Form>
      )}
    </DashboardListItem>
  );
};

export default DashboardAdd;
