import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { Field, Form } from 'react-final-form';
import { Button } from '@material-ui/core';
import { useDashboardParams } from 'features/dashboard';
import { useIssueAdd } from '../hooks';
import IssueContainer from './IssueContainer';

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
  const [add] = useIssueAdd({ dashboardId });

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
            <form onSubmit={handleSubmit}>
              <Field name="title">
                {({ input }) => (
                  <input
                    {...input}
                    required
                    autoFocus
                  />
                )}
              </Field>

              <Button type="submit">
                Create
              </Button>
            </form>
          )}
        </Form>
      )}

      {!edit && '+ Add issue'}
    </IssueContainer>
  );
};

export default IssueAdd;
