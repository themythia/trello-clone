export const TOGGLE_ADD_CARD = 'TOGGLE_ADD_CARD';
export const TOGGLE_CARD_MODAL = 'TOGGLE_CARD_MODAL';
export const TOGGLE_CARD_MODAL_MENU = 'TOGGLE_CARD_MODAL_MENU';
export const GET_POSITION = 'GET_POSITION';
export const ADD_MODAL_STATE = 'ADD_MODAL_STATE';
export const TOGGLE_LABEL_SIZE = 'TOGGLE_LABEL_SIZE';

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
