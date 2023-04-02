import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./ToDoList";
import {v1} from 'uuid';

export type FilterValuesTypes = "all" | "completed" | "active";


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

  let taskForTodoList = tasks;
  if (filter === "completed") {
    taskForTodoList = tasks.filter((task) => task.isDone);

  }
  if (filter === "active") {
    taskForTodoList = tasks.filter((task) => !task.isDone);
  }


  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={taskForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
      />
    </div>
  );
}

export default App;
