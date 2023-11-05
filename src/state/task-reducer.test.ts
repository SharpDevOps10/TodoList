import { TasksState } from '../App';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from './task-reducer';
import {addTodolistAC, removeTodolistAC} from './todolists-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = removeTaskAC('2', 'todolist2Id');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'].length).toBe(3);
  expect(endState['todolist2Id'].length).toBe(1);
  expect(endState['todolist2Id'].every((t) => t.id !== '2')).toBeTruthy();
});

test('correct task should be added to correct array', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = addTaskAC('juice', 'todolist2Id');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'].length).toBe(3);
  expect(endState['todolist2Id'].length).toBe(3);
  expect(endState['todolist2Id'][0].id).toBeDefined();
  expect(endState['todolist2Id'][0].title).toBe('juice');
  expect(endState['todolist2Id'][0].isDone).toBe(false);
});

test('status of particular task should be changed', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = changeTaskStatusAC('2', false, 'todolist2Id');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'][1].isDone).toBeTruthy();
  expect(endState['todolist2Id'][1].isDone).toBeFalsy();
});

test('title of particular task should be changed', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = changeTaskTitleAC('2', 'Way', 'todolist2Id');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'][1].title).toBe('JS');
  expect(endState['todolist2Id'][1].title).toBe('Way');
});

test('new property with new array should be added when new todolist is added', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = addTodolistAC('title');
  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((key) => key !== 'todolist1Id' && key !== 'todolist2Id');
  if (!newKey) throw Error('New key should be added');

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test('property with todolistId should be deleted', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: 'CSS', isDone: true },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: 'The Sorrows Of Werther', isDone: false },
      { id: '2', title: 'Milk', isDone: true },
    ],
  };

  const action = removeTodolistAC('todolist2Id');
  const endState = taskReducer(startState, action);

  const keys = Object.keys(endState);
  expect(keys.length).toBe(1);
  expect(endState['todolist2Id']).toBeUndefined();
});