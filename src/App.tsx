import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./ToDoList";

function App() {
  let tasks: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Node", isDone: false},
  ];

  function removeTask(id: number) {
    let resultTasks = tasks.filter((task) => task.id !== id);
    console.log(resultTasks);
  }


  return (
    <div className="App">
      <Todolist title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
      />
    </div>
  );
}

export default App;
