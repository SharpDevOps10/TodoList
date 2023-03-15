import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./ToDoList";

export type FilterValuesTypes = "all" | "completed" | "active";


function App() {
  let initTask: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Node", isDone: false},
  ];
  let [tasks, setTasks] = useState(initTask);
  let [filter, setFilter] = useState<FilterValuesTypes>("completed");

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    console.log(filteredTasks);
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
      />
    </div>
  );
}

export default App;
