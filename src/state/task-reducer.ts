import { TasksState } from '../App';

type RemoveTaskActionType = {
  type: 'REMOVE TASK';
  todolistId: string;
  taskId: string;
};

type Action2Type = {
  type: '2';
  title: string;
};

type ActionsType = RemoveTaskActionType | Action2Type;

export const taskReducer = (state: TasksState, action: ActionsType): TasksState => {
  switch (action.type) {
    case 'REMOVE TASK' : {
      const stateCopy = {...state};
      const tasks = state[action.todolistId];
      stateCopy[action.todolistId] = tasks.filter((task) => task.id !== action.taskId);
      return stateCopy;
    }
    case '2': {
      return { ...state };
    }
  }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return { type: 'REMOVE TASK', todolistId, taskId};
};

export const action2AC = (title: string): Action2Type => {
  return { type: '2', title: title };
};