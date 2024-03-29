import React, { useCallback } from 'react';
import './App.css';
import { Todolist } from './ToDoList';

import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from './state/todolists-reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from './state/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { TasksState, TodoListType } from './AppWithReducers';

export type FilterValuesTypes = 'all' | 'completed' | 'active';

function AppWithRedux () {
  const dispatch = useDispatch();
  const todoLists = useSelector<AppRootState, Array<TodoListType>>( (state) => state.todolist);
  const tasksObj = useSelector<AppRootState, TasksState>( (state) => state.tasks);

  const removeTask = useCallback ((id: string, todoListId: string) => {
    dispatch(removeTaskAC(id, todoListId));
  }, [dispatch]);

  const addTask = useCallback ((title: string, todoListId: string) => {
    dispatch(addTaskAC(title, todoListId));
  }, [dispatch]);

  const changeFilter = useCallback ((value: FilterValuesTypes, todoListId: string) => {
    dispatch(changeTodolistFilterAC(todoListId, value));
  }, [dispatch]);

  const changeStatus = useCallback ((taskID: string, isDone: boolean, todoListId: string) => {
    dispatch(changeTaskStatusAC(taskID, isDone, todoListId));
  }, [dispatch]);

  const changeTaskTitle = useCallback ((taskID: string, newTitle: string, todoListId: string) => {
    dispatch(changeTaskTitleAC(taskID, newTitle, todoListId));
  }, [dispatch]);

  const removeTodoList = useCallback ((todoListId: string) => {
    dispatch(removeTodolistAC(todoListId));
  }, [dispatch]);

  const changeTodoListTitle = useCallback ((id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title));
  }, [dispatch]);

  const addTodoList = useCallback ((title: string) => {
    dispatch(addTodolistAC(title));
  }, [dispatch]);


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <Menu/>
          </IconButton>
          <Typography variant="h6">
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: '15px' }}>
          <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container spacing={3}>
          {

            todoLists.map((tl) => {
              let taskForTodoList = tasksObj[tl.id];

              return <Grid item>
                <Paper style={{ padding: '15px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>;
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
