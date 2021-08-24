import {
  TOGGLE_ADD_CARD,
  TOGGLE_CARD_MODAL,
  TOGGLE_CARD_MODAL_MENU,
  GET_POSITION,
} from '../actions/menu';
const defaultState = {
  tasks: {
    'task-1': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-2': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-3': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-4': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-5': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-6': {
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-7': {
      showCardModal: false,
      showCardModalMenu: false,
    },
  },
};
const menu = (state = defaultState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_CARD:
      return {
        ...state,
        [action.column]: {
          addCard: action.bool,
        },
      };
    case TOGGLE_CARD_MODAL:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            showCardModal: action.bool,
          },
        },
      };
    case TOGGLE_CARD_MODAL_MENU:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            showCardModalMenu: action.bool,
            menuType: action.menuType,
          },
        },
      };
    case GET_POSITION:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            position: action.position,
          },
        },
      };
    default:
      return state;
  }
};
export default menu;
