import React from "react";
export type TaskType = {
  id : number,
  title : string,
  isDone : boolean,
};
type PropsType = {
  title : string,
  tasks : Array<TaskType>,
};
export function Todolist(props : PropsType) {

  return <div>
    <h3>{props.title}</h3>
    <div>
      <input/>
      <button>+</button>
    </div>
    <ul>
      {
        props.tasks.map((param) => {
          return <li><input type="checkbox" checked={param.isDone}/>
            <span>{param.title}</span>
            <button onClick={() => {alert('click')}}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button>All</button>
      <button>Active</button>
      <button>Completed</button>
    </div>
  </div>

}