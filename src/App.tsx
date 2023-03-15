import React from 'react';
import './App.css';
import {Todolist} from "./ToDoList";

function App() {
  let task1 = [
    {id : 1, title : "CSS", isDone : true},
    {id : 1, title : "JS", isDone : true},
    {id : 1, title : "React", isDone : false},
  ];
  let task2 = [
    {id : 1, title : "Terminator", isDone : true},
    {id : 1, title : "Dumb and Dumber", isDone : true},
    {id : 1, title : "HTML is a crap", isDone : false},
  ];
  return (
    <div className="App">
      <Todolist title = "What to learn"/>
      <Todolist title = "Movies"/>
    </div>
  );
}

export default App;
