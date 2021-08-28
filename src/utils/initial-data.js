const initialData = {
  tasks: {
    'task-1': {
      id: 'task-1',
      content: 'Take out the garbage',
      time: 1629713661276,
      labels: [],
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-2': {
      id: 'task-2',
      content: 'Watch my fav show',
      time: 1629713661266,
      labels: [],
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-3': {
      id: 'task-3',
      content: 'Charge my phone',
      time: 1629713661256,
      labels: [],
      showCardModal: false,
      showCardModalMenu: false,
    },
    'task-4': {
      id: 'task-4',
      content: 'Cook dinner',
      time: 1629713661246,
      labels: [],
      showCardModal: false,
      showCardModalMenu: false,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
      showMenu: false,
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
      showMenu: false,
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2'],
  taskCount: 4,
  columnCount: 2,
};
export default initialData;
