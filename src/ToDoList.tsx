import React, {ChangeEvent, useState} from "react";
import {FilterValuesTypes} from "./App";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};
type PropsType = {
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValuesTypes) => void,
  addTask: (title: string) => void,
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    let data = event.currentTarget.value
    setNewTaskTitle(data);
  };

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={newTaskTitle}
             onChange={onChangeHandler}
             onKeyPress={(object) => {
               if (object.shiftKey && object.charCode === 13) {
                 props.addTask(newTaskTitle);
                 setNewTaskTitle("");
               }
             }}
      />
      <button onClick={() => {
        props.addTask(newTaskTitle);
        setNewTaskTitle("");
      }}>+
      </button>
    </div>
    <ul>
      {
        props.tasks.map((param) => {
          return <li key={param.id}><input type="checkbox" checked={param.isDone}/>
            <span>{param.title}</span>
            <button onClick={() => {
              props.removeTask(param.id)
            }}>x
            </button>
          </li>
        })
      }
    </ul>
    <div>
      <button onClick={() => props.changeFilter("all")}>All</button>
      <button onClick={() => props.changeFilter("active")}>Active</button>
      <button onClick={() => props.changeFilter("completed")}>Completed</button>
    </div>
  </div>

}