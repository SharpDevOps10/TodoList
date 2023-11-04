import {TasksState} from '../App';
import {v1} from 'uuid';

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

type ActionsType = RemoveTaskActionType | AddTaskActionType;

export const taskReducer = (state: TasksState, action: ActionsType): TasksState => {
  switch (action.type) {
    case 'REMOVE TASK' : {
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter((task) => task.id !== action.taskId);
      return stateCopy;
    }
    case 'ADD TASK': {
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      stateCopy[action.todolistId] = [newTask, ...tasks];
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