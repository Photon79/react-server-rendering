import { createStore } from 'redux';

function reducer(state, action) {
  if(state === undefined) {
    return {};
  }

  switch(action.type) {
    case 'fill_form':
      return {...state, payload: action.data};

    default:
      return state;
  }
}

export function configureStore(initialState) {
  return createStore(reducer, initialState);
};
