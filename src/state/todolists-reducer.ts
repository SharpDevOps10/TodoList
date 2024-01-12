import { FilterValuesTypes, TodoListType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodolistActionType = {
  type: 'REMOVE TODOLIST';
  id: string;
};

export type AddTodolistActionType = {
  type: 'ADD TODOLIST';
  title: string;
  todolistId: string;
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
  {
    id: (action as AddTodolistActionType).todolistId,
    title: (action as AddTodolistActionType).title,
    filter: 'all'
  },
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

export let todoListId1 = v1();
export let todoListId2 = v1();

const initialState: Array<TodoListType> = [
  { id: todoListId1, title: 'What to learn', filter: 'active' },
  { id: todoListId2, title: 'What to buy', filter: 'completed' },
];

export const todolistReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
  const handler = actionHandlers[action.type];
  if (handler) return handler(state, action);
  else return state;
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
  return { type: 'REMOVE TODOLIST', id: todolistId };
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: 'ADD TODOLIST', title, todolistId: v1() };
};

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
  return { type: 'CHANGE TODOLIST TITLE', id: todolistId, title };
};

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesTypes): ChangeTodolistFilterActionType => {
  return { type: 'CHANGE TODOLIST FILTER', id: todolistId, filter };
};