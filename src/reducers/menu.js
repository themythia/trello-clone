import {
  TOGGLE_ADD_CARD,
  TOGGLE_CARD_MODAL,
  TOGGLE_CARD_MODAL_MENU,
  GET_POSITION,
  TOGGLE_LABEL_SIZE,
  GET_SEARCH_INPUT,
  TOGGLE_LIST_MENU,
  ADD_LIST_MENU_COLUMN,
  GET_SCROLL_HEIGHT,
  DELETE_TASK_FROM_MENU,
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
  },
  columns: {
    'column-1': {
      showMenu: false,
      scrollTop: 0,
    },
    'column-2': { showMenu: false, scrollTop: 0 },
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
    case TOGGLE_LIST_MENU:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column.id]: { showMenu: action.bool },
        },
      };
    case ADD_LIST_MENU_COLUMN:
      console.log({
        ...state.columns,
        [action.column.id]: { showMenu: false, scrollTop: 0 },
      });
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column.id]: { showMenu: false, scrollTop: 0 },
        },
      };
    case GET_SCROLL_HEIGHT:
      return {
        ...state,
        [action.columnId]: {
          ...state[action.columnId],
          scrollTop: action.scrollTop,
        },
      };
    case DELETE_TASK_FROM_MENU:
      const copiedMenuTasks = Object.assign({}, state.tasks);
      delete copiedMenuTasks[action.taskId];
      return {
        ...state,
        tasks: copiedMenuTasks,
      };
    default:
      return state;
  }
};
export default menu;
