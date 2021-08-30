import React, { useEffect } from 'react';
import List from './List';
import NewList from './NewList';
import initialData from '../utils/initial-data';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, updateData } from '../actions/data';

const App = () => {
  const dispatch = useDispatch();
  const store = useSelector((store) => store);
  const data = useSelector((store) => store.data);

  useEffect(() => {
    dispatch(getInitialData(initialData));
  }, [dispatch]);

  console.log('store', store);

  // reorder column on drag end
  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    // example of result object
    // result = {
    //   draggableId: 'task-1',
    //   type: 'TYPE',
    //   reason: 'DROP', -- can be DROP or CANCEL
    //   source: {
    //     droppableId: 'column-1',
    //     index: 0
    //   },
    //   -- DESTINATION CAN BE NULL (IF DROPPED OUTSIDE ETC.) --
    //   destination: {
    //     droppableId: 'column-1',
    //     index: 1
    //   }
    // }

    // if there's no destination,
    // there's no need to reorder the column
    if (!destination) {
      return;
    }

    // if destination is same with the source
    // dragged item stayed in the same position
    // hence no need to reorder the column
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // if dragged item is column, creates a newState
    // and dispatches it to update the store
    if (type === 'column') {
      const newColumnOrder = [...data.columnOrder];
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };

      dispatch(updateData(newState));
      return;
    }

    // Column objects that drag started and finished
    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // if start and finish columns are the same,
    // creates a newState and dispatches to update the store
    if (start === finish) {
      const newTaskIds = [...start.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [start.id]: {
            ...start,
            taskIds: newTaskIds,
          },
        },
      };

      dispatch(updateData(newState));
      return;
    }

    // if dragged item moving from one column to another
    // creates a newState to dispatch and update the store
    const startTaskIds = [...start.taskIds];
    const finishTaskIds = [...finish.taskIds];
    startTaskIds.splice(source.index, 1); // removes dragged item from starting column
    finishTaskIds.splice(destination.index, 0, draggableId); // inserts dragged item into finishing column

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    dispatch(updateData(newState));
  };

  //loading
  if (data.columnOrder === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            className='container'
            ref={provided.innerRef}
          >
            {data.columnOrder.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column?.taskIds.map((taskId) => data.tasks[taskId]);
              return (
                <List
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
            <NewList />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
