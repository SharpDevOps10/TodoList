import React, { useCallback, useState } from 'react';
import './App.css';
import { TaskType, Todolist } from './ToDoList';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

export type FilterValuesTypes = 'all' | 'completed' | 'active';
export type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesTypes,
};

export type TasksState = {
  [key: string]: Array<TaskType>
};

function App () {

  const removeTask = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    tasksObj[todoListId] = tasks.filter((task) => task.id !== id);
    setTasks({ ...tasksObj });
  };

  const addTask = (title: string, todoListId: string) => {
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todoListId];
    tasksObj[todoListId] = [task, ...tasks];
    setTasks({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesTypes, todoListId: string) => {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  };

  const changeStatus = (taskID: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskID);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  };

  const changeTaskTitle = (taskID: string, newTitle: string, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskID);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
    }
  };

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: 'What to learn', filter: 'active' },
    { id: todoListId2, title: 'What to buy', filter: 'completed' },
  ]);
  const removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  };

  const changeTodoListTitle = (id: string, title: string) => {
    const todolist = todoLists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = title;
      setTodoLists([...todoLists]);
    }

  };

  let [tasksObj, setTasks] = useState<TasksState>({
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

  const addTodoList = useCallback ((title: string) => {
    const todoList: TodoListType = {
      id: v1(),
      filter: 'all',
      title: title,
    };
    setTodoLists([todoList, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todoList.id]: [],
    });
  }, []);


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

export default App;
