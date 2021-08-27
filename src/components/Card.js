import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { Draggable, useMouseSensor } from 'react-beautiful-dnd';
import { BsPencil } from 'react-icons/bs';
import CardModal from './CardModal';
import { useSelector, useDispatch } from 'react-redux';
import { getPosition, getSearchInput, miniLabel } from '../actions/menu';
import {
  changeCardModalMenuType,
  toggleCardModal,
  toggleCardModalMenu,
} from '../actions/data';
import { toggleEditLabel } from '../actions/labels';
import { darken } from 'polished';

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
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState(null);
  const labelSize = useSelector((store) => store.menu.miniLabel);
  const element = useRef('');
  const dispatch = useDispatch();
  const editLabel = useSelector((store) =>
    store.labels.find((label) => label.edit === true)
  );
  const [labelHover, setLabelHover] = useState(false);
  const cardLabelDiv = useRef(null);

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
          >
            <div ref={element}>
              {labels.length > 0 && (
                <div
                  className={`card-label-div`}
                  onClick={() => {
                    dispatch(miniLabel());
                    cardLabelDiv.current.classList.toggle('active');
                    console.log('carddfg', cardLabelDiv.current.classList);
                  }}
                  onMouseOver={() => setLabelHover(true)}
                  onMouseLeave={() => setLabelHover(false)}
                  ref={cardLabelDiv}
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
                    // if (!labelSize) {
                    //   return (
                    //     <LabelSpan
                    //       key={index}
                    //       background={updatedLabel.color}
                    //       hover={labelHover}
                    //     >
                    //       {updatedLabel.name}
                    //     </LabelSpan>
                    //   );
                    // } else {
                    //   return (
                    //     <LabelSpanMini
                    //       background={updatedLabel.color}
                    //       hover={labelHover}
                    //     />
                    //   );
                    // }
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
            // dispatch(getSearchInput(''));
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
