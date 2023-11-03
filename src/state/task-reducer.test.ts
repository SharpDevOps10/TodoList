import { TasksState } from '../App';
import { action1AC, taskReducer } from './task-reducer';

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

  const action = action1AC('2');
  const endState = taskReducer(startState, action);

  expect(endState['todolist1Id'].length).toBe(3);
  expect(endState['todolist2Id'].length).toBe(1);
  expect(endState['todolist2Id'].every((t) => t.id !== '2')).toBeTruthy();
});



