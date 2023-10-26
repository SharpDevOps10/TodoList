import {userReducer} from './user-reducer';

test('user reducer should increment only age', () => {
  const initialState = {age: 20, childrenCount: 2, name: 'Arthur'};

  const finalState = userReducer(initialState, {type: 'INC AGE'});

  expect(finalState.age).toBe(21);
  expect(finalState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
  const initialState = {age: 20, childrenCount: 2, name: 'Arthur'};

  const finalState = userReducer(initialState, {type: 'INC CHILDREN COUNT'});

  expect(finalState.age).toBe(20);
  expect(finalState.childrenCount).toBe(3);
});

test('user reducer should change the name of the user', () => {
  const initialState = { age: 20, childrenCount: 2, name: 'Arthur' };
  const newName = 'Oleg';

  const finalState = userReducer(initialState, {type: 'CHANGE NAME', newName: newName});

  expect(finalState.name).toBe(newName);
});

