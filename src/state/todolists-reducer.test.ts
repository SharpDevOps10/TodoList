import {v1} from 'uuid';
import {FilterValuesTypes, TodoListType} from '../App';
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todolistReducer
} from './todolists-reducer';

test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState:Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to cook', filter: 'all'},
  ];

  const finishState = todolistReducer(initialState, RemoveTodolistAC(todolistId1));
  expect(finishState.length).toBe(1);
  expect(finishState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New Todolist';
  const initialState:Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to cook', filter: 'all'},
  ];

  const finishState = todolistReducer(initialState, AddTodolistAC(newTodolistTitle));
  expect(finishState.length).toBe(3);
  expect(finishState[2].title).toBe(newTodolistTitle);
  expect(finishState[2].filter).toBe('all');
});

test('correct todolist should change its name', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newTodolistTitle = 'New Todolist';
  const initialState:Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to cook', filter: 'all'},
  ];

  const finishState = todolistReducer(initialState, ChangeTodolistTitleAC(todolistId2, newTodolistTitle));
  expect(finishState[0].title).toBe('What to learn');
  expect(finishState[1].title).toBe(newTodolistTitle);
});

test('correct filter should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  let newFilter: FilterValuesTypes = 'completed';
  const initialState:Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to cook', filter: 'all'},
  ];

  const finishState = todolistReducer(initialState, ChangeTodolistFilterAC(todolistId2, newFilter));
  expect(finishState[0].filter).toBe('all');
  expect(finishState[1].filter).toBe(newFilter);
});