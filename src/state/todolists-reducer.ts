import {FilterValuesTypes, TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodolistActionType = {
  type: 'REMOVE TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD TODOLIST';
  title: string;
};

type ChangeTodolistTitleActionType = {
  type: 'CHANGE TODOLIST TITLE';
  id: string;
  title: string;
};

type ChangeTodolistFilterActionType = {
  type: 'CHANGE TODOLIST FILTER';
  id: string;
  filter: FilterValuesTypes;
};

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

type ActionHandler = (state: Array<TodoListType>, action: ActionsType) => Array<TodoListType>;

const removeTodolist: ActionHandler = (state: Array<TodoListType>, action: ActionsType) =>
  state.filter((tl) => tl.id !== (action as RemoveTodolistActionType).id);

const addTodolist: ActionHandler = (state: Array<TodoListType>, action: ActionsType) => [
  ...state,
  {id: v1(), title: (action as AddTodolistActionType).title, filter: 'all'},
];

const changeTodolistTitle: ActionHandler = (state: Array<TodoListType>, action: ActionsType) =>
  state.map((tl) =>
    tl.id === (action as ChangeTodolistTitleActionType).id
      ? {...tl, title: (action as ChangeTodolistTitleActionType).title}
      : tl
  );

const changeTodolistFilter: ActionHandler = (state: Array<TodoListType>, action: ActionsType) =>
  state.map((tl) =>
    tl.id === (action as ChangeTodolistFilterActionType).id
      ? {...tl, filter: (action as ChangeTodolistFilterActionType).filter}
      : tl
  );

const actionHandlers = {
  'REMOVE TODOLIST': removeTodolist,
  'ADD TODOLIST': addTodolist,
  'CHANGE TODOLIST TITLE': changeTodolistTitle,
  'CHANGE TODOLIST FILTER': changeTodolistFilter,
};

export const todolistReducer = (state: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
  const handler = actionHandlers[action.type];
  if (handler) return handler(state, action);
  else throw new Error('No matching action type');
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD TODOLIST', title: title };
};

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE TODOLIST TITLE', id: todolistId, title: title };
};

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesTypes): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE TODOLIST FILTER', id: todolistId, filter: filter };
};