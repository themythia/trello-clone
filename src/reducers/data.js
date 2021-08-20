import {
  RECEIVE_INITIAL_DATA,
  UPDATE_DATA,
  ADD_NEW_LIST,
  CHANGE_LIST_TITLE,
  ADD_NEW_CARD,
} from '../actions/data';

const data = (state = { demo: {}, new: {} }, action) => {
  switch (action.type) {
    case RECEIVE_INITIAL_DATA:
      return {
        ...state,
        demo: {
          ...action.data,
        },
      };
    case UPDATE_DATA:
      return {
        ...state,
        demo: {
          ...state.demo,
          ...action.data,
        },
      };
    case ADD_NEW_LIST:
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [`column-${state.demo.columnOrder.length + 1}`]: {
              id: `column-${state.demo.columnOrder.length + 1}`,
              title: action.content,
              taskIds: [],
            },
          },
          columnOrder: [
            ...state.demo.columnOrder,
            `column-${state.demo.columnOrder.length + 1}`,
          ],
        },
      };
    case CHANGE_LIST_TITLE:
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.listId]: {
              ...state.demo.columns[action.listId],
              title: action.title,
            },
          },
        },
      };
    case ADD_NEW_CARD:
      const cardCount = state.demo.taskCount;
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [`task-${cardCount + 1}`]: {
              id: `task-${cardCount + 1}`,
              content: action.content,
            },
          },
          columns: {
            ...state.demo.columns,
            [action.listId]: {
              ...state.demo.columns[action.listId],
              taskIds: state.demo.columns[action.listId].taskIds.concat(
                `task-${cardCount + 1}`
              ),
            },
          },
          taskCount: cardCount + 1,
        },
      };
    default:
      return state;
  }
};
export default data;
