import React, { useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { Button, TextField } from '@material-ui/core';
import { useClickAway } from 'react-use';
import { useDashboardAdd } from 'features/dashboard/hooks';
import {
  DashboardAddForm,
  DashboardAddFormFooter,
} from './DashboardAdd.styled';
import { DashboardListItem } from './DashboardList.styled';

type APIDashboardFormData = {
  title: string;
};

const DashboardAdd = () => {
  const [add] = useDashboardAdd();
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
