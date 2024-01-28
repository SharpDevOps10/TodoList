import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@material-ui/core';
import { Add } from '@material-ui/icons';

type AddItemFormPropsType = {
  addItem: (title: string) => void,
};

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let data = event.currentTarget.value;
    setNewTaskTitle(data);
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (event.shiftKey && event.charCode === 13) {
      props.addItem(newTaskTitle);
      setNewTaskTitle('');
    }
  };
  return <div>
    <TextField value={newTaskTitle}
               variant={'outlined'}
               label={'Type value'}
               onChange={onChangeHandler}
               onKeyPress={onKeyPressHandler}
               error={!!error}
               helperText={error}
    />
    <IconButton onClick={addTask} color={'primary'}>
      <Add/>
    </IconButton>
  </div>;
});
