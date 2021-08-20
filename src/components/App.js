import React, { useEffect } from 'react';
import initialData from '../utils/initial-data';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import List from './List';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, updateData } from '../actions/data';
import NewList from './NewList';

const App = () => {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.demo);
  console.log('data', data);

  useEffect(() => {
    dispatch(getInitialData(initialData));
  }, [dispatch]);

  //onDragStart
  // start = {
  //   draggableId: 'task-1',
  //   type: 'TYPE',
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0
  //   }
  // }
  //onDragUpdate
  // update = {
  //   ...start,
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1
  //   }
  // }

  const onDragEnd = (result) => {
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

    //reorder our column
    const { destination, source, draggableId, type } = result;

    // if there's no destination, there's no need to
    // reorder the column
    if (!destination) {
      return;
    }

    // if destination is same with the source
    // item stayed in the same position
    // hence no need to reorder the column
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...data,
        columnOrder: newColumnOrder,
      };
      dispatch(updateData(newState));
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // if start and finish columns are the same
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1); // removes ONE item FROM index
      newTaskIds.splice(destination.index, 0, draggableId); // adds item to destination index
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };
      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      console.log('result', result);
      console.log('newState', newState);
      dispatch(updateData(newState));
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='all-columns' direction='horizontal' type='column'>
        {(provided) => (
          <div
            className='container'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data?.columnOrder?.map((columnId, index) => {
              const column = data.columns[columnId];
              const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
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
