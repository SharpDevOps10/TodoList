import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { taskReducer } from './task-reducer';
import { todolistReducer } from './todolists-reducer';

const rootReducer = combineReducers({
  todolist: todolistReducer,
  tasks: taskReducer,
});

type AppRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });

// @ts-ignore
window.store = store;