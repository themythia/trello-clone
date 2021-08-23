import {
  RECEIVE_INITIAL_DATA,
  UPDATE_DATA,
  ADD_NEW_LIST,
  CHANGE_LIST_TITLE,
  ADD_NEW_CARD,
  COPY_LIST,
  SORT_LIST,
  DELETE_ALL_CARDS,
  DELETE_LIST,
  CHANGE_CARD_CONTENT,
} from '../actions/data';

const data = (
  state = {
    demo: {},
    new: { tasks: {}, columns: {}, columnOrder: [], taskCount: 0 },
  },
  action
) => {
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
      let columnCount = state.demo.columnCount;
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [`column-${columnCount + 1}`]: {
              id: `column-${columnCount + 1}`,
              title: action.content,
              taskIds: [],
            },
          },
          columnOrder: [...state.demo.columnOrder, `column-${columnCount + 1}`],
          columnCount: columnCount + 1,
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
      let copyListColumnCount = state.demo.columnCount;
      const newColumnOrder = state.demo.columnOrder.slice();
      newColumnOrder.splice(
        action.index,
        0,
        `column-${copyListColumnCount + 1}`
      );

      if (action.column.taskIds.length === 0) {
        return {
          ...state,
          demo: {
            ...state.demo,
            columns: {
              ...state.demo.columns,
              [`column-${copyListColumnCount + 1}`]: {
                ...action.column,
                id: `column-${copyListColumnCount + 1}`,
              },
            },
            columnOrder: newColumnOrder,
            columnCount: copyListColumnCount + 1,

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
    case SORT_LIST:
      console.log('action.column', action.column);
      const newTaskIds = state.demo.columns[action.column.id].taskIds.slice();
      newTaskIds.sort(
        (a, b) => state.demo.tasks[b].time - state.demo.tasks[a].time
      );
      console.log('newTaskIds', newTaskIds);

      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.column.id]: {
              ...state.demo.columns[action.column.id],
              taskIds:
                action.sortType === 'newest'
                  ? newTaskIds.sort(
                      (a, b) =>
                        state.demo.tasks[a].time - state.demo.tasks[b].time
                    )
                  : action.sortType === 'oldest'
                  ? newTaskIds.sort(
                      (a, b) =>
                        state.demo.tasks[b].time - state.demo.tasks[a].time
                    )
                  : action.sortType === 'abc'
                  ? newTaskIds.sort(function (a, b) {
                      if (
                        state.demo.tasks[a].content <
                        state.demo.tasks[b].content
                      ) {
                        return -1;
                      }
                      if (a.firstname > b.firstname) {
                        return 1;
                      }
                      return 0;
                    })
                  : newTaskIds,
            },
          },
        },
      };
    case DELETE_ALL_CARDS:
      console.log('DELETE_ALL_CARDS');
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.column.id]: {
              ...state.demo.columns[action.column.id],
              taskIds: [],
            },
          },
        },
      };
    case DELETE_LIST:
      const newColumns = Object.assign({}, state.demo.columns);
      delete newColumns[action.column.id];

      return {
        ...state,
        demo: {
          ...state.demo,
          columns: newColumns,
          columnOrder: state.demo.columnOrder.filter(
            (column) => column !== action.column.id
          ),
        },
      };
    case CHANGE_CARD_CONTENT:
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [action.task.id]: {
              ...state.demo.tasks[action.task.id],
              content: action.newContent,
            },
          },
        },
      };
    default:
      return state;
  }
};
export default data;
