import React, { useCallback } from 'react';
import { FilterValuesTypes } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { Task } from './Task';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todoListId: string) => void,
  changeFilter: (value: FilterValuesTypes, todoListId: string) => void,
  addTask: (title: string, todoListId: string) => void,
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void,
  changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void,
  filter: FilterValuesTypes,
  removeTodoList: (todoListId: string) => void,
  changeTodoListTitle: (id: string, title: string) => void,
};

export const Todolist = React.memo((props: PropsType) => {
  const onAllClickHandler = useCallback(() => {
    props.changeFilter('all', props.id);
  }, [props.changeFilter, props.id]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter('active', props.id);
  }, [props.changeFilter, props.id]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter('completed', props.id);
  }, [props.changeFilter, props.id]);

  const removeTodoListHandler = () => props.removeTodoList(props.id);

  const changeTodoListTitle = useCallback((title: string) => {
    props.changeTodoListTitle(props.id, title);
  }, [props.changeTodoListTitle, props.id]);

  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.addTask, props.id]);

  return <div>
    <h3><EditableSpan title={ props.title } onChange={ changeTodoListTitle }></EditableSpan>
      <IconButton onClick={ removeTodoListHandler }>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={ addTask }></AddItemForm>
    <div>
      {
        props.tasks.map((task) => <Task
          task={ task }
          changeTaskStatus={ props.changeTaskStatus }
          changeTaskTitle={ props.changeTaskTitle }
          removeTask={ props.removeTask }
          todolistId={ props.id }
          key={ task.id }
        />)
      }
    </div>
    <div>
      <Button variant={ props.filter === 'all' ? 'contained' : 'text' }
              onClick={ onAllClickHandler }>All
      </Button>
      <Button color={ 'primary' } variant={ props.filter === 'active' ? 'contained' : 'text' }
              onClick={ onActiveClickHandler }>Active
      </Button>
      <Button color={ 'secondary' } variant={ props.filter === 'completed' ? 'contained' : 'text' }
              onClick={ onCompletedClickHandler }>Completed
      </Button>
    </div>
  </div>;
});

