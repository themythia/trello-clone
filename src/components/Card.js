import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { BsPencil } from 'react-icons/bs';
import CardModal from './CardModal';
import { useSelector, useDispatch } from 'react-redux';
import { getPosition } from '../actions/menu';
import { toggleCardModal } from '../actions/data';

const Card = ({ task, index }) => {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState(null);
  const element = useRef('');
  const dispatch = useDispatch();
  // const showCardModal = useSelector(
  //   (store) => store.menu.tasks[task.id].showCardModal
  // );
  const showCardModal = useSelector(
    (store) => store.data.demo.tasks[task.id].showCardModal
  );
  const labels = useSelector((store) => store.data.demo.tasks[task.id].labels);

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
  }, []);

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
              {labels.length > 0 && (
                <div className='card-label-div'>
                  {labels.map((label, index) => (
                    <span
                      className='card-label'
                      style={{ background: label.color }}
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              )}
              {task.content}
              {hover === true && (
                <BsPencil
                  onClick={() => {
                    dispatch(getPosition(task, position));
                    dispatch(toggleCardModal(true, task));
                  }}
                  className='card-container-icon'
                />
              )}
            </div>
          </div>
        )}
      </Draggable>
      {showCardModal === true && (
        <CardModal
          show={showCardModal}
          onClose={() => dispatch(toggleCardModal(false, task))}
          task={task}
        />
      )}
    </React.Fragment>
  );
};
export default Card;
