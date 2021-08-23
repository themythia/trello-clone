import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { BsPencil } from 'react-icons/bs';
import CardModal from './CardModal';

const Card = ({ task, index }) => {
  const [hover, setHover] = useState(false);
  const [showModal, setShowModal] = useState('false');
  const [position, setPosition] = useState(null);
  const element = useRef('');

  useEffect(() => {
    const rect = element.current.getBoundingClientRect();
    setPosition({
      x: rect.x,
      y: rect.y,
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
    });
    console.log(rect);
  }, []);
  // const rect = element.current.getBoundingClientRect();
  // if (rect && rect.current) {
  //   console.log(rect);
  // }

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
  console.log('hover:', hover);
  return (
    <React.Fragment>
      <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className='card-container'
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <div ref={element}>
              {task.content}
              {hover === true && (
                <BsPencil
                  onClick={() => setShowModal(true)}
                  className='card-container-icon'
                />
              )}
            </div>
          </div>
        )}
      </Draggable>
      {showModal === true && (
        <CardModal
          show={showModal}
          onClose={() => setShowModal(false)}
          position={position}
          task={task}
        />
      )}
    </React.Fragment>
  );
};
export default Card;
