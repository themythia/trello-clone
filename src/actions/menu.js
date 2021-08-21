export const TOGGLE_ADD_CARD = 'TOGGLE_ADD_CARD';

export const toggleAddCard = (bool, column) => ({
  type: TOGGLE_ADD_CARD,
  bool,
  column,
});
