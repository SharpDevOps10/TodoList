import React, { useReducer, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './ToDoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer
} from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from './state/task-reducer';

export type FilterValuesTypes = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesTypes,
};

export type TasksState = {
  [key: string]: Array<TaskType>
};

function AppWithReducers () {

  function removeTask (id: string, todoListId: string) {
    dispatchTaskReducer(removeTaskAC(id, todoListId));
  }

  function addTask (title: string, todoListId: string) {
    dispatchTaskReducer(addTaskAC(title, todoListId));
  }

  function changeFilter (value: FilterValuesTypes, todoListId: string) {
    dispatchTodolistReducer(changeTodolistFilterAC(todoListId, value));
  }

  function changeStatus (taskID: string, isDone: boolean, todoListId: string) {
    dispatchTaskReducer(changeTaskStatusAC(taskID, isDone, todoListId));
  }

  function changeTaskTitle (taskID: string, newTitle: string, todoListId: string) {
    dispatchTaskReducer(changeTaskTitleAC(taskID, newTitle, todoListId));
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, dispatchTodolistReducer] = useReducer(todolistReducer, [
    { id: todoListId1, title: 'What to learn', filter: 'active' },
    { id: todoListId2, title: 'What to buy', filter: 'completed' },
  ]);

  function removeTodoList (todoListId: string) {
    const action = removeTodolistAC(todoListId);
    dispatchTodolistReducer(action);
    dispatchTaskReducer(action);
  }

  function changeTodoListTitle (id: string, title: string)  {
    dispatchTodolistReducer(changeTodolistTitleAC(id, title));
  }

  let [tasksObj, dispatchTaskReducer] = useReducer(taskReducer, {
    [todoListId1]: [
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'React', isDone: false },
      { id: v1(), title: 'Node', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false }],
    [todoListId2]: [
      { id: v1(), title: 'The Sorrows Of Werther', isDone: false },
      { id: v1(), title: 'Milk', isDone: true }],
  });

  function addTodoList (title: string) {
    const action = addTodolistAC(title);
    dispatchTodolistReducer(action);
    dispatchTaskReducer(action);
  }


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
              if (tl.filter === 'completed') {
                taskForTodoList = taskForTodoList.filter((task) => task.isDone);

              }
              if (tl.filter === 'active') {
                taskForTodoList = taskForTodoList.filter((task) => !task.isDone);
              }
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

export default AppWithReducers;
