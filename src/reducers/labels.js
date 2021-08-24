import { CREATE_LABEL, EDIT_LABEL, DELETE_LABEL } from '../actions/labels';
const defaultState = [
  {
    id: 'label-1',
    name: 'ListListListListListListListListListListListListListListListListList',
    color: '#61bd4f',
  },
  {
    id: 'label-2',
    name: 'List Action',
    color: '#f2d600',
  },
  {
    id: 'label-3',
    name: 'Card',
    color: '#ff9f1a',
  },
  {
    id: 'label-4',
    name: 'Card Action',
    color: '#eb5a46',
  },
  {
    id: 'label-5',
    name: 'Labels',
    color: '#c377e0',
  },
  {
    id: 'label-6',
    name: 'Properties',
    color: '#0079bf',
  },
];
const labels = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_LABEL:
      if (
        state.find((label) => label.name === action.label.name) === undefined
      ) {
        return [...state, action.label];
      }
      return state;
    case EDIT_LABEL:
      return state.map((label) =>
        label.id === action.labelId
          ? { ...action.label, name: action.name, color: action.color }
          : label
      );
    case DELETE_LABEL:
      return state.filter((label) => label.id !== action.labelId);
    default:
      return state;
  }
};
export default labels;
