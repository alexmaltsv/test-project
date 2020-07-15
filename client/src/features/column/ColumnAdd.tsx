import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Field, Form } from 'react-final-form';
import { Button, Box, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { APIColumnInput } from 'api-types';
import {
  ColumnAddFooter,
  ColumndAddForm,
  ColumndAddLink,
} from 'features/column/ColumnAdd.styled';
import { useColumnAdd } from 'features/column/hooks';
import { useDashboardParams } from 'features/dashboard/hooks';

type ColumnAddProps = {
  index: number;
};

const ColumnAdd = ({ index }: ColumnAddProps) => {
  const { dashboardId } = useDashboardParams();
  const [columnAdd, { error }] = useColumnAdd({ dashboardId });
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

  const handleEdit = () => {
    setEdit(true);
  };

  const submit = (column: APIColumnInput) => {
    columnAdd({ variables: { column } }).then(
      () => setEdit(false),
    );
  };

  return (
    <div ref={refContainer}>

      {!edit && (
        <ColumndAddLink onClick={handleEdit}>
          + Add column
        </ColumndAddLink>
      )}

      {edit && (
        <Form
          initialValues={{ dashboardId, position: index }}
          onSubmit={submit}
        >
          {({ handleSubmit }) => (
            <ColumndAddForm onSubmit={handleSubmit}>
              <Field name="title">
                {({ input }) => (
                  <TextField
                    {...input}
                    autoFocus
                    required
                    label="Title"
                  />
                )}
              </Field>

              {error && (
                <Box mt={2}>
                  <Alert severity="error">{error.message}</Alert>
                </Box>
              )}

              <ColumnAddFooter>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Create
                </Button>
              </ColumnAddFooter>
            </ColumndAddForm>
          )}
        </Form>
      )}
    </div>
  );
};

export default ColumnAdd;
