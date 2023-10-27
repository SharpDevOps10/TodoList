import {TodoListType} from '../App';
import {v1} from 'uuid';

type ActionType = {
  type: string,
  [key: string]: any,
};

export const todolistReducer = (state: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
  const actionHandlers: { [key: string]: (state: Array<TodoListType>, action: ActionType) => Array<TodoListType> } = {
    'REMOVE TODOLIST': (state, action) => state.filter((tl) => tl.id !== action.id),
    'ADD TODOLIST': (state, action) => [
      ...state, {
        id: v1(),
        title: action.title,
        filter: 'all',
      },
    ],
    'CHANGE TODOLIST TITLE': (state, action) => {
      return state.map((tl) => {
        if (tl.id === action.id) return { ...tl, title: action.title };
        return tl;
      });
    },
    'CHANGE TODOLIST FILTER': (state, action) => {
      return state.map((tl) => {
        if (tl.id === action.id) return { ...tl, filter: action.filter };
        return tl;
      });
    },
  };

  const handler = actionHandlers[action.type];
  if (handler) return handler(state, action);
  else throw new Error('No matching action type');
};