import React, { ChangeEvent, useCallback } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import { EditableSpan } from './EditableSpan';
import { Delete } from '@material-ui/icons';
import { TaskType } from './ToDoList';

type TaskPropsType = {
  removeTask: (id: string, todoListId: string) => void,
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void,
  changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void,
  task: TaskType,
  todolistId: string,
};

export const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = useCallback(() => {
    props.removeTask(props.task.id, props.todolistId);
  }, [props.removeTask, props.task.id, props.todolistId]);

  const onChangeStatusHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, event.currentTarget.checked, props.todolistId);
  }, [props.changeTaskStatus, props.task.id, props.todolistId]);

  const onChangeTitleHandler = useCallback((newValue: string) => {
    props.changeTaskTitle(props.task.id, newValue, props.todolistId);
  }, [props.changeTaskTitle, props.task.id, props.todolistId]);

  return <div key={ props.task.id } className={ props.task.isDone ? 'is-done' : '' }>
    <Checkbox
      onChange={ onChangeStatusHandler }
      checked={ props.task.isDone }/>
    <EditableSpan title={ props.task.title } onChange={ onChangeTitleHandler }/>
    <IconButton onClick={ onRemoveHandler }>
      <Delete/>
    </IconButton>
  </div>;
});