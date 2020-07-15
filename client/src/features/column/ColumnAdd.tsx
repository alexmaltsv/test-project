import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Field, Form } from 'react-final-form';
import { APIColumnInput } from 'api-types';
import {
  ColumnAddFooter,
  ColumndAddForm,
  ColumndAddLink,
} from 'features/column/ColumnAdd.styled';
import { useColumnAdd } from 'features/column/hooks';
import { useDashboardParams } from 'features/dashboard/hooks';
import { Button, TextField } from '@material-ui/core';

type ColumnAddProps = {
  index: number;
};

const ColumnAdd = ({ index }: ColumnAddProps) => {
  const { dashboardId } = useDashboardParams();
  const [columnAdd] = useColumnAdd({ dashboardId });
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

  if (edit) {
    return (
      <div ref={refContainer}>
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
      </div>
    );
  }

  return (
    <div>
      <ColumndAddLink onClick={handleEdit}>
        + Add column
      </ColumndAddLink>
    </div>
  );
};

export default ColumnAdd;
