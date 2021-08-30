export const TOGGLE_ADD_CARD = 'TOGGLE_ADD_CARD';
export const TOGGLE_CARD_MODAL = 'TOGGLE_CARD_MODAL';
export const TOGGLE_CARD_MODAL_MENU = 'TOGGLE_CARD_MODAL_MENU';
export const GET_POSITION = 'GET_POSITION';
export const ADD_MODAL_STATE = 'ADD_MODAL_STATE';
export const TOGGLE_LABEL_SIZE = 'TOGGLE_LABEL_SIZE';
export const GET_SEARCH_INPUT = 'GET_SEARCH_INPUT';
export const TOGGLE_LIST_MENU = 'TOGGLE_LIST_MENU';
export const ADD_LIST_MENU_COLUMN = 'ADD_LIST_MENU_COLUMN';
export const GET_SCROLL_HEIGHT = 'GET_SCROLL_HEIGHT';
export const DELETE_TASK_FROM_MENU = 'DELETE_TASK_FROM_MENU';

export const toggleAddCard = (bool, column) => ({
  type: TOGGLE_ADD_CARD,
  bool,
  column,
});

export const toggleCardModal = (bool, task) => ({
  type: TOGGLE_CARD_MODAL,
  task,
  bool,
});

export const toggleCardModalMenu = (bool, task, menuType) => ({
  type: TOGGLE_CARD_MODAL_MENU,
  bool,
  task,
  menuType,
});

export const getPosition = (task, position) => {
  return {
    type: GET_POSITION,
    task,
    position,
  };
};

export const addModalState = () => ({ type: ADD_MODAL_STATE });
export const miniLabel = () => ({ type: TOGGLE_LABEL_SIZE });
export const getSearchInput = (input) => ({ type: GET_SEARCH_INPUT, input });

// Toggles list menu ON/OFF
export const toggleListMenu = (bool, column) => ({
  type: TOGGLE_LIST_MENU,
  bool,
  column,
});

// adds a a new column property to store.menu.columns
// WHEN an existing list copied OR a new list created
export const addListMenuColumn = (column) => ({
  type: ADD_LIST_MENU_COLUMN,
  column,
});

export const getScrollHeight = (columnId, scrollTop) => ({
  type: GET_SCROLL_HEIGHT,
  columnId,
  scrollTop,
});

// deletes task from menu.tasks when card deleted
export const deleteTaskFromMenu = (taskId) => ({
  type: DELETE_TASK_FROM_MENU,
  taskId,
});
