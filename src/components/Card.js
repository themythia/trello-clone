import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, index }) => {
  // example of snapshot object

  // draggable
  // snapshot = {
  //   isDragging: true,  --boolean
  //   draggingOver: 'column-1', -- can be null
  // }

  //droppable
  // snapshot = {
  //   isDraggingOver: true,
  //   draggingOverWith: 'task-1'
  // }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          className='card-container'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};
export default Card;
