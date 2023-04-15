import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesTypes} from "./App";

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
};
type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  removeTask: (id: string, todoListId: string) => void,
  changeFilter: (value: FilterValuesTypes, todoListId: string) => void,
  addTask: (title: string, todoListId: string) => void,
  changeTaskStatus: (taskID: string, isDone: boolean, todoListId: string) => void,
  filter : FilterValuesTypes,
};

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string|null>(null);
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let data = event.currentTarget.value
    setNewTaskTitle(data);
  };
  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (event.shiftKey && event.charCode === 13) {
      props.addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }

  };
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);


  return <div>
    <h3>{props.title}</h3>
    <div>
      <input value={newTaskTitle}
             onChange={onChangeHandler}
             onKeyPress={onKeyPressHandler}
             className={error ? "error" : ""}
      />
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
    <ul>
      {
        props.tasks.map((param) => {
          const onRemoveHandler = () => props.removeTask(param.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(param.id, e.currentTarget.checked);
          };

          return <li key={param.id} className={ param.isDone ? "is-done" : ""}>
            <input type="checkbox"
                   onChange={onChangeHandler}
                   checked={param.isDone}/>
            <span>{param.title}</span>
            <button onClick={onRemoveHandler}>x</button>
          </li>
        })
      }
    </ul>
    <div>
      <button className={props.filter === 'all' ? "active-filter" : ""}
              onClick={onAllClickHandler}>All</button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
          onClick={onActiveClickHandler}>Active</button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
          onClick={onCompletedClickHandler}>Completed</button>
    </div>
  </div>

}