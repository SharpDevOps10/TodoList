import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./ToDoList";
import {v1} from 'uuid';

export type FilterValuesTypes = "all" | "completed" | "active";
type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesTypes,
};

function App() {

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let task = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todoListId];
    let newTasks = [task,...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeFilter(value: FilterValuesTypes, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  function changeStatus(taskID: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskID);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }

  let todoListId1 = v1();
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: "What to learn", filter: "active"},
    {id: todoListId2, title: "What to buy", filter: "completed"},
  ]);
  const removeTodoList = (todoListId: string) => {
    let filteredTodoList = todoLists.filter((tl) => tl.id !== todoListId);
    setTodoLists(filteredTodoList);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
  };

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      {id: v1(), title: "CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Node", isDone: true},
      {id: v1(), title: "GraphQL", isDone: false}],
    [todoListId2]: [
      {id: v1(), title: "The Sorrows Of Werther", isDone: false},
      {id: v1(), title: "Milk", isDone: true}],
  });


  return (
    <div className="App">
      {

        todoLists.map((tl) => {
          let taskForTodoList = tasksObj[tl.id];
          if (tl.filter === "completed") {
            taskForTodoList = taskForTodoList.filter((task) => task.isDone);

          }
          if (tl.filter === "active") {
            taskForTodoList = taskForTodoList.filter((task) => !task.isDone);
          }
          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        })
      }
    </div>
  );
}

export default App;
