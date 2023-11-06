import { TasksState } from '../App';
import { v1 } from 'uuid';
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer';

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
  ChangeTaskStatusType | ChangeTaskTitleType |
  AddTodolistActionType | RemoveTodolistActionType;

export const taskReducer = (state: TasksState, action: ActionsType): TasksState => {
  const stateCopy = { ...state };

  const actionReducers: Record<string, (action: ActionsType) => void> = {
    'REMOVE TASK': (action) => {
      const { todolistId, taskId } = action as RemoveTaskActionType;
      stateCopy[todolistId] = stateCopy[todolistId].filter((task) => task.id !== taskId);
    },
    'ADD TASK': (action) => {
      const { todolistId, title } = action as AddTaskActionType;
      const newTask = { id: v1(), title, isDone: false };
      stateCopy[todolistId] = [newTask, ...stateCopy[todolistId]];
    },
    'CHANGE TASK STATUS': (action) => {
      const { todolistId, taskId, isDone } = action as ChangeTaskStatusType;
      stateCopy[todolistId] = stateCopy[todolistId].map((task) =>
        task.id === taskId ? { ...task, isDone } : task
      );
    },
    'CHANGE TASK TITLE': (action) => {
      const { todolistId, taskId, title } = action as ChangeTaskTitleType;
      stateCopy[todolistId] = stateCopy[todolistId].map((task) =>
        task.id === taskId ? { ...task, title } : task
      );
    },
    'ADD TODOLIST': (action) => {
      const { todolistId } = action as AddTodolistActionType;
      stateCopy[todolistId] = [];
    },
    'REMOVE TODOLIST': (action) => {
      const { id } = action as RemoveTodolistActionType;
      delete stateCopy[id];
    },
  };

  const actionHandler = actionReducers[action.type];
  if (actionHandler) actionHandler(action);

  return stateCopy;
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