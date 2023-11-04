import { TasksState } from '../App';
import {addTaskAC, removeTaskAC, taskReducer} from './task-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksState = {
    'todolist1Id': [
      { id: '1', title: "CSS", isDone: true },
      { id: '2', title: "JS", isDone: true },
      { id: '3', title: "React", isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: "The Sorrows Of Werther", isDone: false },
      { id: '2', title: "Milk", isDone: true },
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
      { id: '1', title: "CSS", isDone: true },
      { id: '2', title: "JS", isDone: true },
      { id: '3', title: "React", isDone: false },
    ],
    'todolist2Id': [
      { id: '1', title: "The Sorrows Of Werther", isDone: false },
      { id: '2', title: "Milk", isDone: true },
    ],
  };

  const action = addTaskAC('juice');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'].length).toBe(3);
  expect(endState['todolist2Id'].length).toBe(3);
  expect(endState['todolist2Id'][0].id).toBeDefined();
  expect(endState['todolist2Id'][0].title).toBe('juice');
  expect(endState['todolist2Id'][0].isDone).toBe(false);
});


