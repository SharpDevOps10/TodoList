import { TasksState } from '../App';
import { v1 } from 'uuid';

type RemoveTaskActionType = {
  type: 'REMOVE TASK';
  todolistId: string;
  taskId: string;
};

type AddTaskActionType = {
  type: 'ADD TASK';
  title: string;
  todolistId: string;
};

type ChangeTaskStatusType = {
  type: 'CHANGE TASK STATUS';
  isDone: boolean;
  taskId: string;
  todolistId: string;
};

type ChangeTaskTitleType = {
  type: 'CHANGE TASK TITLE';
  taskId: string;
  title: string;
  todolistId: string;
};

type ActionsType = RemoveTaskActionType | AddTaskActionType |
  ChangeTaskStatusType | ChangeTaskTitleType;

export const taskReducer = (state: TasksState, action: ActionsType): TasksState => {
  switch (action.type) {
    case 'REMOVE TASK' : {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter((task) => task.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD TASK': {
      const stateCopy = { ...state };
      const tasks = state[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      stateCopy[action.todolistId] = [newTask, ...tasks];
      return stateCopy;
    }
    case 'CHANGE TASK STATUS': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((task) =>
        task.id === action.taskId ? { ...task, isDone: action.isDone } : task
      );
      return stateCopy;
    }
    case 'CHANGE TASK TITLE': {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todolistId];
      stateCopy[action.todolistId] = tasks.map((task) =>
        task.id === action.taskId ? { ...task, title: action.title } : task
      );
      return stateCopy;
    }
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE TASK', todolistId, taskId};
};

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
  return { type: 'ADD TASK', title, todolistId };
};

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusType => {
  return { type: 'CHANGE TASK STATUS', isDone, taskId, todolistId };
};

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
  return { type: 'CHANGE TASK TITLE', title, taskId, todolistId };
};