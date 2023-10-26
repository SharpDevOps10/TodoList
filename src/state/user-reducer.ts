type StateType = {
  age: number,
  childrenCount: number,
  name: string,
};

type ActionType = {
  type: string,
  [key: string]: any,
};

export const userReducer = (state: StateType, action: ActionType): StateType => {
  const actionHandlers: { [key: string]: () => StateType } = {
    'INC AGE': () => {
      return { ...state, age: state.age + 1 };
    },
    'INC CHILDREN COUNT': () => {
      return { ...state, childrenCount: state.childrenCount + 1 };
    },
    'CHANGE NAME': () => {
      return {...state, name: action.newName};
    },
  };

  const handler = actionHandlers[action.type];
  if (handler) return handler();
  else throw new Error('No matching action type');
};