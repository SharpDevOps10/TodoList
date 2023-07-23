import React, {ChangeEvent} from "react";
import {FilterValuesTypes} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
  changeTaskTitle: (taskID: string, newTitle: string, todoListId: string) => void,
  filter: FilterValuesTypes,
  removeTodoList: (todoListId: string) => void,
  changeTodoListTitle: (id: string, title: string) => void
};

export function Todolist(props: PropsType) {
  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
  const removeTodoListHandler = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(props.id, title);
  }

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };


  return <div>
    <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}></EditableSpan>
      <IconButton onClick={removeTodoListHandler}>
        <Delete/>
      </IconButton>
    </h3>
    <AddItemForm addItem={addTask}></AddItemForm>
    <div>
      {
        props.tasks.map((param) => {
          const onRemoveHandler = () => props.removeTask(param.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(param.id, e.currentTarget.checked, props.id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(param.id, newValue, props.id);
          };

          return <div key={param.id} className={param.isDone ? "is-done" : ""}>
            <Checkbox
              onChange={onChangeStatusHandler}
              checked={param.isDone}/>
            <EditableSpan title={param.title} onChange={onChangeTitleHandler}/>
            <IconButton onClick={onRemoveHandler}>
              <Delete/>
            </IconButton>
          </div>
        })
      }
    </div>
    <div>
      <Button variant={props.filter === 'all' ? "contained" : "text"}
              onClick={onAllClickHandler}>All
      </Button>
      <Button color={"primary"} variant={props.filter === 'active' ? "contained" : "text"}
              onClick={onActiveClickHandler}>Active
      </Button>
      <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
              onClick={onCompletedClickHandler}>Completed
      </Button>
    </div>
  </div>

}

