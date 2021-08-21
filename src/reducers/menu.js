import { TOGGLE_ADD_CARD } from '../actions/menu';

const menu = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_ADD_CARD:
      return {
        ...state,
        [action.column]: {
          addCard: action.bool,
        },
      };
    default:
      return state;
  }
};
export default menu;
