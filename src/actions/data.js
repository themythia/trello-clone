export const RECEIVE_INITIAL_DATA = 'RECEIVE_INITIAL_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const ADD_NEW_LIST = 'ADD_NEW_LIST';
export const CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE';
export const ADD_NEW_CARD = 'ADD_NEW_CARD';
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
