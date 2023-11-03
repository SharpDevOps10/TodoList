import { TasksState } from '../App';

type Action1Type = {
  type: '1';
  id: string;
};

type Action2Type = {
  type: '2';
  title: string;
};

type ActionsType = Action1Type | Action2Type;

export const taskReducer = (state: TasksState, action: ActionsType): TasksState => {
  switch (action.type) {
    case '1' : {
      return { ...state };
    }
    case '2': {
      return { ...state };
    }
  }
};

export const action1AC = (todolistId: string): Action1Type => {
  return { type: '1', id: todolistId };
};

export const action2AC = (title: string): Action2Type => {
  return { type: '2', title: title };
};