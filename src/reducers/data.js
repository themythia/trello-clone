/* eslint-disable no-undef */
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

const data = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_INITIAL_DATA:
      return {
        ...state,
        ...action.data,
      };
    case UPDATE_DATA:
      return {
        ...state,
        ...action.data,
      };
    case ADD_NEW_LIST:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.id]: {
            id: action.id,
            title: action.content,
            taskIds: [],
            showMenu: false,
          },
        },
        columnOrder: [...state.columnOrder, action.id],
        columnCount: state.columnCount + 1,
      };
    case CHANGE_LIST_TITLE:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.listId]: {
            ...state.columns[action.listId],
            title: action.title,
          },
        },
      };
    case ADD_NEW_CARD:
      const cardCount = state.taskCount;
      return {
        ...state,
        tasks: {
          ...state.tasks,
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
          ...state.columns,
          [action.listId]: {
            ...state.columns[action.listId],
            taskIds: state.columns[action.listId].taskIds.concat(action.id),
          },
        },
        taskCount: cardCount + 1,
      };

    case COPY_LIST:
      const copiedList = {
        id: action.id,
        title: action.column.title,
        taskIds: [],
        showMenu: false,
      };

      const copiedColumnOrder = state.columnOrder.slice();
      copiedColumnOrder.splice(action.index + 1, 0, action.id);

      if (action.column.taskIds.length === 0) {
        return {
          ...state,
          columns: {
            ...state.columns,
            [action.id]: copiedList,
          },
          columnOrder: copiedColumnOrder,
          columnCount: state.columnCount + 1,
        };
      }

      // creates new tasks copied from action.column
      const copiedTasks = action.column.taskIds.map((task) => {
        let id = ID();
        return {
          [id]: {
            ...state.tasks[task],
            id,
          },
        };
      });

      const copiedStateTasks = Object.assign({}, state.tasks);
      // //reduces copiedTasks and copiedStateTasks in a new object
      const newListTasks = copiedTasks.reduce(
        (target, current) => Object.assign({}, target, current),
        copiedStateTasks
      );

      return {
        ...state,
        tasks: newListTasks,
        columns: {
          ...state.columns,
          [action.id]: {
            ...action.column,
            id: action.id,
            taskIds: copiedTasks.map((task) => Object.keys(task)[0]),
            showMenu: false,
          },
        },
        columnOrder: copiedColumnOrder,
        columnCount: state.columnCount + 1,
        taskCount: state.taskCount + copiedTasks.length,
      };

    case SORT_LIST:
      let newTaskIds = state.columns[action.column.id].taskIds.slice();

      const { tasks } = state;
      const sortNewest = () =>
        newTaskIds.sort((a, b) =>
          BigInt(tasks[b].time) > BigInt(tasks[a].time)
            ? 1
            : BigInt(tasks[b].time) < BigInt(tasks[a].time)
            ? -1
            : 0
        );
      const sortOldest = () =>
        newTaskIds.sort((a, b) =>
          BigInt(tasks[b].time) > BigInt(tasks[a].time)
            ? -1
            : BigInt(tasks[b].time) < BigInt(tasks[a].time)
            ? 1
            : 0
        );

      const sortAbc = () =>
        newTaskIds.sort((a, b) =>
          tasks[a].content < tasks[b].content
            ? -1
            : tasks[a].content > tasks[b].content
            ? 1
            : 0
        );

      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column.id]: {
            ...state.columns[action.column.id],
            taskIds:
              action.sortType === 'newest'
                ? sortNewest()
                : action.sortType === 'oldest'
                ? sortOldest()
                : action.sortType === 'abc'
                ? sortAbc()
                : newTaskIds,
          },
        },
      };

    case DELETE_ALL_CARDS:
      // clones tasks object
      const deleteAllCardsTasks = Object.assign({}, state.tasks);
      // deletes all cards from cloned tasks object
      action.column.taskIds.forEach(
        (taskId) => delete deleteAllCardsTasks[taskId]
      );

      return {
        ...state,
        tasks: deleteAllCardsTasks,
        taskCount: state.taskCount - action.column.taskIds.length,
        columns: {
          ...state.columns,
          [action.column.id]: {
            ...state.columns[action.column.id],
            taskIds: [],
          },
        },
      };

    case DELETE_LIST:
      // clones and creates a new data.columns object
      const newColumns = Object.assign({}, state.columns);
      // clones and creates a new taskIds array of list that will be deleted
      const newDeleteListTaskIds = [...newColumns[action.column.id].taskIds];
      // clones and creates a new data.tasks object
      const newDeleteListTasks = Object.assign({}, state.tasks);

      // deletes tasks of deleted list from copied tasks object
      newDeleteListTaskIds.forEach(
        (taskId) => delete newDeleteListTasks[taskId]
      );

      //deletes list from copied columns object
      delete newColumns[action.column.id];

      return {
        ...state,
        tasks: newDeleteListTasks,
        columns: newColumns,
        columnOrder: state.columnOrder.filter(
          (column) => column !== action.column.id
        ),
        taskCount: Object.keys(newDeleteListTasks).length,
        columnCount: state.columnOrder.length - 1,
      };
    case CHANGE_CARD_CONTENT:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            content: action.newContent,
          },
        },
      };
    case TOGGLE_LABEL:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            labels:
              state.tasks[action.task.id].labels.find(
                (label) => label.id === action.label.id
              ) === undefined
                ? [...state.tasks[action.task.id].labels, action.label]
                : state.tasks[action.task.id].labels.filter(
                    (label) => label.id !== action.label.id
                  ),
          },
        },
      };
    case TOGGLE_CARD_MODAL:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            showCardModal: action.bool,
          },
        },
      };
    case TOGGLE_CARD_MODAL_MENU:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            showCardModalMenu: action.bool,
            menuType: action.menuType,
          },
        },
      };
    case CHANGE_CARD_MODAL_MENU_TYPE:
      return {
        ...state,
        tasks: {
          ...state.tasks,
          [action.task.id]: {
            ...state.tasks[action.task.id],
            menuType: action.menuType,
          },
        },
      };
    case DELETE_LABEL:
      const copyTasks = Object.assign({}, state.tasks);
      for (const task in copyTasks) {
        copyTasks[task].labels = copyTasks[task].labels.filter(
          (label) => label.id !== action.labelId
        );
      }
      return {
        ...state,
        tasks: copyTasks,
      };
    case DELETE_CARD:
      // clones task object
      const deleteCardTasks = Object.assign({}, state.tasks);
      // deletes task from cloned object
      delete deleteCardTasks[action.task.id];

      return {
        ...state,
        tasks: deleteCardTasks,
        columns: {
          ...state.columns,
          [action.column.id]: {
            ...state.columns[action.column.id],
            taskIds: action.column.taskIds.filter(
              (taskId) => taskId !== action.task.id
            ),
          },
        },
        taskCount: state.taskCount - 1,
      };
    case COPY_CARD:
      return {
        ...state,
        taskCount: state.taskCount + 1,
        tasks: {
          ...state.tasks,
          [action.id]: {
            ...action.task,
            id: action.id,
            time: Date.now(),
            showCardModal: false,
            showCardModalMenu: false,
          },
        },
        columns: {
          ...state.columns,
          [action.column.id]: {
            ...state.columns[action.column.id],
            taskIds: [...state.columns[action.column.id].taskIds, action.id],
          },
        },
      };
    case TOGGLE_LIST_MENU:
      return {
        ...state,
        columns: {
          ...state.columns,
          [action.column.id]: {
            ...state.columns[action.column.id],
            showMenu: action.bool,
          },
        },
      };
    default:
      return state;
  }
};
export default data;
