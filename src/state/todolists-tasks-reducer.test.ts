import { TasksState, TodoListType } from '../App';
import { addTodolistAC, todolistReducer } from './todolists-reducer';
import { taskReducer } from './task-reducer';

test('ids should be equal', () => {
  const startTasksState: TasksState = {};
  const startTodolistState: Array<TodoListType> = [];

  const action = addTodolistAC('new todolist');

  const endTaskState = taskReducer(startTasksState, action);
  const endTodolistState = todolistReducer(startTodolistState, action);

  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistState[0].id;

  expect(idFromTasks).toStrictEqual(action.todolistId);
  expect(idFromTodolists).toStrictEqual(action.todolistId);
});