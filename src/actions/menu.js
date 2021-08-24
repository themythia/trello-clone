export const TOGGLE_ADD_CARD = 'TOGGLE_ADD_CARD';
export const TOGGLE_CARD_MODAL = 'TOGGLE_CARD_MODAL';
export const TOGGLE_CARD_MODAL_MENU = 'TOGGLE_CARD_MODAL_MENU';
export const GET_POSITION = 'GET_POSITION';

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
  console.log('GET POSITION RUNNING');
  return {
    type: GET_POSITION,
    task,
    position,
  };
};
