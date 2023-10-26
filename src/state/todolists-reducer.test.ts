import {v1} from 'uuid';
import {TodoListType} from '../App';
import {todolistReducer} from './todolists-reducer';

test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const initialState:Array<TodoListType> = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to cook', filter: 'all'},
  ];

  const finishState = todolistReducer(initialState, { type: 'REMOVE TODOLIST', id: todolistId1});
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

  const finishState = todolistReducer(initialState, { type: 'ADD TODOLIST', title: newTodolistTitle});
  expect(finishState.length).toBe(3);
  expect(finishState[2].title).toBe(newTodolistTitle);
  expect(finishState[2].filter).toBe('all');
});