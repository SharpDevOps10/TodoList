import React from "react";
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
  addTask : () => void,
};

export function Todolist(props: PropsType) {

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {
        props.tasks.map((param) => {
          return <li key = {param.id}><input type="checkbox" checked={param.isDone}/>
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