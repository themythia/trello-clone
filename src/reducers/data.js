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
  TOGGLE_LABEL,
  TOGGLE_CARD_MODAL,
  TOGGLE_CARD_MODAL_MENU,
  CHANGE_CARD_MODAL_MENU_TYPE,
  DELETE_LABEL,
  DELETE_CARD,
  COPY_CARD,
  TOGGLE_LIST_MENU,
} from '../actions/data';
import ID from '../utils/generateId';

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
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.id]: {
              id: action.id,
              title: action.content,
              taskIds: [],
              showMenu: false,
            },
          },
          columnOrder: [...state.demo.columnOrder, action.id],
          columnCount: state.demo.columnCount + 1,
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
            [action.id]: {
              id: action.id,
              content: action.content,
              labels: [],
              time: Date.now(),
              showCardModal: false,
              showCardModalMenu: false,
            },
          },
          columns: {
            ...state.demo.columns,
            [action.listId]: {
              ...state.demo.columns[action.listId],
              taskIds: state.demo.columns[action.listId].taskIds.concat(
                action.id
              ),
            },
          },
          taskCount: cardCount + 1,
        },
      };

    case COPY_LIST:
      const copiedList = {
        id: action.id,
        title: action.column.title,
        taskIds: [],
        showMenu: false,
      };

      const copiedColumnOrder = state.demo.columnOrder.slice();
      copiedColumnOrder.splice(action.index + 1, 0, action.id);

      if (action.column.taskIds.length === 0) {
        return {
          ...state,
          demo: {
            ...state.demo,
            columns: {
              ...state.demo.columns,
              [action.id]: copiedList,
            },
            columnOrder: copiedColumnOrder,
            columnCount: state.demo.columnCount + 1,
          },
        };
      }

      // creates new tasks copied from action.column
      const copiedTasks = action.column.taskIds.map((task) => {
        let id = ID();
        return {
          [id]: {
            ...state.demo.tasks[task],
            id,
          },
        };
      });

      const copiedStateTasks = Object.assign({}, state.demo.tasks);
      // //reduces copiedTasks and copiedStateTasks in a new object
      const newListTasks = copiedTasks.reduce(
        (target, current) => Object.assign({}, target, current),
        copiedStateTasks
      );

      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: newListTasks,
          columns: {
            ...state.demo.columns,
            [action.id]: {
              ...action.column,
              id: action.id,
              taskIds: copiedTasks.map((task) => Object.keys(task)[0]),
              showMenu: false,
            },
          },
          columnOrder: copiedColumnOrder,
          columnCount: state.demo.columnCount + 1,
          taskCount: state.demo.taskCount + copiedTasks.length,
        },
      };

    case SORT_LIST:
      console.log('action.column', action.column);
      let newTaskIds = state.demo.columns[action.column.id].taskIds.slice();
      // newTaskIds.sort((a, b) => {
      //   return state.demo.tasks[b].time - state.demo.tasks[a].time;
      // });
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
    case TOGGLE_LABEL:
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [action.task.id]: {
              ...state.demo.tasks[action.task.id],
              labels:
                state.demo.tasks[action.task.id].labels.find(
                  (label) => label.id === action.label.id
                ) === undefined
                  ? [...state.demo.tasks[action.task.id].labels, action.label]
                  : state.demo.tasks[action.task.id].labels.filter(
                      (label) => label.id !== action.label.id
                    ),
            },
          },
        },
      };
    case TOGGLE_CARD_MODAL:
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [action.task.id]: {
              ...state.demo.tasks[action.task.id],
              showCardModal: action.bool,
            },
          },
        },
      };
    case TOGGLE_CARD_MODAL_MENU:
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [action.task.id]: {
              ...state.demo.tasks[action.task.id],
              showCardModalMenu: action.bool,
              menuType: action.menuType,
            },
          },
        },
      };
    case CHANGE_CARD_MODAL_MENU_TYPE:
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: {
            ...state.demo.tasks,
            [action.task.id]: {
              ...state.demo.tasks[action.task.id],
              menuType: action.menuType,
            },
          },
        },
      };
    case DELETE_LABEL:
      const copyTasks = Object.assign({}, state.demo.tasks);
      for (const task in copyTasks) {
        copyTasks[task].labels = copyTasks[task].labels.filter(
          (label) => label.id !== action.labelId
        );
      }
      return {
        ...state,
        demo: {
          ...state.demo,
          tasks: copyTasks,
        },
      };
    case DELETE_CARD:
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.column.id]: {
              ...state.demo.columns[action.column.id],
              taskIds: action.column.taskIds.filter(
                (taskId) => taskId !== action.task.id
              ),
            },
          },
        },
      };
    case COPY_CARD:
      return {
        ...state,
        demo: {
          ...state.demo,
          taskCount: state.demo.taskCount + 1,
          tasks: {
            ...state.demo.tasks,
            [action.id]: {
              ...action.task,
              id: action.id,
              time: Date.now(),
              showCardModal: false,
              showCardModalMenu: false,
            },
          },
          columns: {
            ...state.demo.columns,
            [action.column.id]: {
              ...state.demo.columns[action.column.id],
              taskIds: [
                ...state.demo.columns[action.column.id].taskIds,
                action.id,
              ],
            },
          },
        },
      };
    case TOGGLE_LIST_MENU:
      console.log('logger:', action.log);
      return {
        ...state,
        demo: {
          ...state.demo,
          columns: {
            ...state.demo.columns,
            [action.column.id]: {
              ...state.demo.columns[action.column.id],
              showMenu: action.bool,
            },
          },
        },
      };
    default:
      return state;
  }
};
export default data;
