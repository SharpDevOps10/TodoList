import React, {ChangeEvent} from "react";
import {FilterValuesTypes} from "./App";
import {AddItemForm} from "./AddItemForm";

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
  filter: FilterValuesTypes,
  removeTodoList: (todoListId: string) => void,
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };


  return <div>
    <h3>{props.title}
      <button onClick={removeTodoListHandler}>x</button>
    </h3>
    <AddItemForm addItem={addTask}></AddItemForm>
    <ul>
      {
        props.tasks.map((param) => {
          const onRemoveHandler = () => props.removeTask(param.id, props.id);
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(param.id, e.currentTarget.checked, props.id);
          };

          return <li key={param.id} className={param.isDone ? "is-done" : ""}>
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
              onClick={onAllClickHandler}>All
      </button>
      <button className={props.filter === 'active' ? "active-filter" : ""}
              onClick={onActiveClickHandler}>Active
      </button>
      <button className={props.filter === 'completed' ? "active-filter" : ""}
              onClick={onCompletedClickHandler}>Completed
      </button>
    </div>
  </div>

}

