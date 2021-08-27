export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
export const COPY_LIST = 'COPY_LIST';
export const SORT_LIST = 'SORT_LIST';
export const DELETE_ALL_CARDS = 'DELETE_ALL_CARDS';
export const DELETE_LIST = 'DELETE_LIST';
export const CHANGE_CARD_CONTENT = 'CHANGE_CARD_CONTENT';
export const TOGGLE_LABEL = 'TOGGLE_LABEL';
export const TOGGLE_CARD_MODAL = 'TOGGLE_CARD_MODAL';
export const TOGGLE_CARD_MODAL_MENU = 'TOGGLE_CARD_MODAL_MENU';
export const CHANGE_CARD_MODAL_MENU_TYPE = 'CHANGE_CARD_MODAL_MENU_TYPE';
export const DELETE_LABEL = 'DELETE_LABEL';
export const DELETE_CARD = 'DELETE_CARD';
export const COPY_CARD = 'COPY_CARD';
export const TOGGLE_LIST_MENU = 'TOGGLE_LIST_MENU';

export const getInitialData = (data) => ({ type: RECEIVE_INITIAL_DATA, data });

export const updateData = (data) => ({ type: UPDATE_DATA, data });
export const handleNewList = (content) => ({ type: ADD_NEW_LIST, content });
export const changeListTitle = (title, listId) => ({
  type: CHANGE_LIST_TITLE,
  title,
  listId,
});

export const addNewCard = (content, listId) => ({
  type: ADD_NEW_CARD,
  content,
  listId,
});

export const copyList = (column, index) => ({ type: COPY_LIST, column, index });

export const sortList = (column, sortType) => ({
  type: SORT_LIST,
  sortType,
  column,
});

export const deleteAllCards = (column) => ({ type: DELETE_ALL_CARDS, column });

export const deleteList = (column) => ({ type: DELETE_LIST, column });

export const changeCardContent = (task, newContent) => ({
  type: CHANGE_CARD_CONTENT,
  task,
  newContent,
});

export const toggleLabel = (task, label) => ({
  type: TOGGLE_LABEL,
  task,
  label,
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

export const changeCardModalMenuType = (task, menuType) => ({
  type: CHANGE_CARD_MODAL_MENU_TYPE,
  task,
  menuType,
});

export const deleteLabelFromTask = (labelId) => ({
  type: DELETE_LABEL,
  labelId,
});

export const deleteCard = (task, column) => ({
  type: DELETE_CARD,
  task,
  column,
});

export const copyCard = (task, column, id) => ({
  type: COPY_CARD,
  task,
  column,
  id,
});

export const toggleListMenu = (bool, column, log) => ({
  type: TOGGLE_LIST_MENU,
  bool,
  column,
  log,
});
