import {
  RECEIVE_INITIAL_DATA,
  UPDATE_DATA,
  ADD_NEW_LIST,
  CHANGE_LIST_TITLE,
  ADD_NEW_CARD,
  COPY_LIST,
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
    case COPY_LIST:
      const newColumnOrder = state.demo.columnOrder.slice();
      newColumnOrder.splice(
        1,
        0,
        `column-${state.demo.columnOrder.length + 1}`
      );

      console.log('newColumnOrder', newColumnOrder);
      if (action.column.taskIds.length === 0) {
        return {
          ...state,
          demo: {
            ...state.demo,
            columns: {
              ...state.demo.columns,
              [`column-${state.demo.columnOrder.length + 1}`]: {
                ...action.column,
                id: `column-${state.demo.columnOrder.length + 1}`,
              },
            },
            columnOrder: newColumnOrder,

            // columnOrder: [
            //   ...state.demo.columnOrder,
            //   `column-${state.demo.columnOrder.length + 1}`,
            // ],
          },
        };
      }
      //creates new tasks with new taskIds in an array
      const copiedListTasksArray = action.column.taskIds.map((task, index) => ({
        [`task-${Object.keys(state.demo.tasks).length + index + 1}`]: {
          id: `task-${Object.keys(state.demo.tasks).length + index + 1}`,
          content: state.demo.tasks[task].content,
        },
      }));
      //reduces copiedListTasksArray in a new object
      const copiedListTasks = copiedListTasksArray.reduce((target, current) =>
        Object.assign(target, current)
      );
      //copies state.tasks without mutating the state
      const stateTasksCopy = Object.assign({}, state.demo.tasks);

      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: Object.assign(stateTasksCopy, copiedListTasks),
          columns: {
            ...state.demo.columns,
            [`column-${state.demo.columnOrder.length + 1}`]: {
              ...action.column,
              id: `column-${state.demo.columnOrder.length + 1}`,
              taskIds: Object.keys(copiedListTasks),
            },
          },
          columnOrder: newColumnOrder,
          // columnOrder: [
          //   ...state.demo.columnOrder,
          //   `column-${state.demo.columnOrder.length + 1}`,
          // ],
          taskCount: state.demo.taskCount + copiedListTasksArray.length,
        },
      };
    default:
      return state;
  }
};
export default data;
