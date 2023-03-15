import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./ToDoList";

function App() {
  let initTask: Array<TaskType> = [
    {id: 1, title: "CSS", isDone: true},
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React", isDone: false},
    {id: 4, title: "Node", isDone: false},
  ];
  let [tasks,setTasks] = useState(initTask);

  function removeTask(id: number) {
    let filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
    console.log(filteredTasks);
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
