import {
  TOGGLE_ADD_CARD,
  TOGGLE_CARD_MODAL,
  TOGGLE_CARD_MODAL_MENU,
  GET_POSITION,
  TOGGLE_LABEL_SIZE,
  GET_SEARCH_INPUT,
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
  miniLabel: false,
  searchInput: '',
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
    case TOGGLE_LABEL_SIZE:
      return {
        ...state,
        miniLabel: state.miniLabel === false ? true : false,
      };
    case GET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.input,
      };
    default:
      return state;
  }
};
export default menu;
