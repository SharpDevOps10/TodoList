import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./ToDoList";
import {v1} from 'uuid';

export type FilterValuesTypes = "all" | "completed" | "active";
type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesTypes,
};

function App() {
  let initTask: Array<TaskType> = [
    {id: v1(), title: "CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Node", isDone: false},
  ];
  let [tasks, setTasks] = useState(initTask);
  let [filter, setFilter] = useState<FilterValuesTypes>("completed");

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

  function changeFilter(value: FilterValuesTypes) {
    setFilter(value);
  }
  function changeStatus (taskID : string, isDone : boolean) {
    let task = tasks.find((t) => t.id === taskID);
    if (task) task.isDone = isDone;
    setTasks([...tasks]);
  }

  let taskForTodoList = tasks;
  if (filter === "completed") {
    taskForTodoList = tasks.filter((task) => task.isDone);

  }
  if (filter === "active") {
    taskForTodoList = tasks.filter((task) => !task.isDone);
  }
  let todoList: Array<TodoListType> = [
    {id: v1(), title: "What to learn", filter: "active"},
    {id: v1(), title: "What to buy", filter: "completed"},
  ];


  return (
    <div className="App">
      {
        todoList.map((tl) => {
          return <Todolist title={tl.title}
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
