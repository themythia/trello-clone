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
