export const CREATE_LABEL = 'CREATE_LABEL';
export const EDIT_LABEL = 'EDIT_LABEL';
export const DELETE_LABEL = 'DELETE_LABEL';
export const TOGGLE_EDIT_LABEL = 'TOGGLE_EDIT_LABEL';
export const createLabel = (label) => ({ type: CREATE_LABEL, label });

export const editLabel = (labelId, name, color) => ({
  type: EDIT_LABEL,
  labelId,
  name,
  color,
});
export const deleteLabel = (labelId) => ({ type: DELETE_LABEL, labelId });

export const toggleEditLabel = (labelId = '', bool) => ({
  type: TOGGLE_EDIT_LABEL,
  labelId,
  bool,
});
