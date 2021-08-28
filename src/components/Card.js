import React, { useState, useRef, useEffect } from 'react';
import CardModal from './CardModal';
import { Draggable } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { getPosition, miniLabel } from '../actions/menu';
import { toggleCardModal, toggleCardModalMenu } from '../actions/data';
import { toggleEditLabel } from '../actions/labels';
import styled from 'styled-components';
import { darken } from 'polished';
import { BsPencil } from 'react-icons/bs';

const LabelSpan = styled.span`
  display: inline-block;
  font-size: 12px;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  margin: 0 4px 4px 0;
  padding: 0 8px;
  max-width: 210px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  width: ${(props) => (props.minified ? '40px' : 'auto')};
  height: ${(props) => (props.minified ? '8px' : 'auto')};
  background: ${(props) =>
    props.hover ? darken(0.1, props.background) : props.background};
`;

const Card = ({ task, index, column }) => {
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState(null);
  const [labelHover, setLabelHover] = useState(false);

  const element = useRef(null);

  const labelSize = useSelector((store) => store.menu.miniLabel);
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

  // gets position of card relative to viewport
  useEffect(() => {
    const rect = element.current.getBoundingClientRect();
    const { x, y, top, bottom, left, right, width } = rect;
    setPosition({
      x,
      y,
      top,
      bottom,
      left,
      right,
      width,
    });
  }, []);

  return (
    <React.Fragment>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className='card-container'
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <div ref={element}>
              {labels.length > 0 && (
                <div
                  className='card-label-div'
                  onClick={() => dispatch(miniLabel())}
                  onMouseOver={() => setLabelHover(true)}
                  onMouseLeave={() => setLabelHover(false)}
                >
                  {taskLabels.map((taskLabel, index) => {
                    const updatedLabel = labels.find(
                      (label) => label.id === taskLabel.id
                    );
                    return (
                      <LabelSpan
                        key={index}
                        background={updatedLabel.color}
                        hover={labelHover}
                        minified={labelSize}
                      >
                        {!labelSize && updatedLabel.name}
                      </LabelSpan>
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
          column={column}
        />
      )}
    </React.Fragment>
  );
};
export default Card;
