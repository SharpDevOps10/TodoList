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
  let [tasks, setTasks] = useState([
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Node", isDone: true},
    {id: v1(), title: "GraphQL", isDone: false},
  ]);

  function removeTask(id: string) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    console.log(filteredTasks);
  }

  function addTask(title: string) {
    let newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasksCollection = [newTask, ...tasks];
    setTasks(tasksCollection);
  }

  function changeFilter(value: FilterValuesTypes, todoListId: string) {
    let todoList = todoLists.find((tl) => tl.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...todoLists]);
    }

  }

  function changeStatus(taskID: string, isDone: boolean) {
    let task = tasks.find((t) => t.id === taskID);
    if (task) task.isDone = isDone;
    setTasks([...tasks]);
  }

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: v1(), title: "What to learn", filter: "active"},
    {id: v1(), title: "What to buy", filter: "completed"},
  ]);


  return (
    <div className="App">
      {

        todoLists.map((tl) => {
          let taskForTodoList = tasks;
          if (tl.filter === "completed") {
            taskForTodoList = tasks.filter((task) => task.isDone);

          }
          if (tl.filter === "active") {
            taskForTodoList = tasks.filter((task) => !task.isDone);
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
          />
        })
      }
    </div>
  );
}

export default App;
