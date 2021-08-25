import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import { BsPencil } from 'react-icons/bs';
import CardModal from './CardModal';
import { useSelector, useDispatch } from 'react-redux';
import { getPosition } from '../actions/menu';
import {
  changeCardModalMenuType,
  toggleCardModal,
  toggleCardModalMenu,
} from '../actions/data';
import { toggleEditLabel } from '../actions/labels';

const Card = ({ task, index }) => {
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState(null);
  const element = useRef('');
  const dispatch = useDispatch();
  const editLabel = useSelector((store) =>
    store.labels.find((label) => label.edit === true)
  );

  const showCardModal = useSelector(
    (store) => store.data.demo.tasks[task.id].showCardModal
  );
  const taskLabels = useSelector(
    (store) => store.data.demo.tasks[task.id].labels
  );
  const labels = useSelector((store) => store.labels);

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
                  {taskLabels.map((taskLabel, index) => {
                    const updatedLabel = labels.find(
                      (label) => label.id === taskLabel.id
                    );
                    return (
                      <span
                        key={index}
                        className='card-label'
                        style={{ background: updatedLabel.color }}
                      >
                        {updatedLabel.name}
                      </span>
                    );
                  })}
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
          onClose={() => {
            dispatch(toggleCardModal(false, task));
            dispatch(toggleCardModalMenu(false, task, 'label'));
            dispatch(toggleEditLabel(editLabel?.id, false));
          }}
          task={task}
        />
      )}
    </React.Fragment>
  );
};
export default Card;
