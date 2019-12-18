import { createSelector } from 'reselect';

const ADD_ITEM = 'app/ADD_ITEM';

const initState = {
  list: [1, 2, 3, 4, 5],
};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return { ...state, list: [...state.list, state.list.length] };
    default:
      return state;
  }
};

export const addNewItem = () => ({ type: ADD_ITEM });

export const getList = createSelector(
  state => state.app.list,
  list => list,
);
