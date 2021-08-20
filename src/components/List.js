import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeListTitle } from '../actions/data';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import NewCard from './NewCard';

//if min-height not declared in tasklist, drop area height will be 0px

const List = ({ column, tasks, index }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const textInput = useRef('');
  console.log(textInput.current);
  const InnerList = React.memo(function InnerList({ tasks }) {
    return tasks.map((task, index) => (
      <Card key={task.id} task={task} index={index} />
    ));
  });

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        if (input.length > 0) {
          dispatch(changeListTitle(input, column.id));
          setInput('');
          setShow(false);
        }
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [input]);

  console.log('show', show);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          className='list-container'
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {show === false ? (
            <h3
              className='title'
              {...provided.dragHandleProps}
              onClick={() => setShow(true)}
            >
              {column.title}
            </h3>
          ) : (
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={textInput}
              autoFocus
              onBlur={() => {
                if (input.length > 0) {
                  dispatch(changeListTitle(input, column.id));
                }
                setInput('');
                setShow(false);
              }}
              {...provided.dragHandleProps}
            ></input>
          )}

          <Droppable droppableId={column.id} type='task'>
            {(provided, snapshot) => (
              <div
                className='card-list'
                ref={provided.innerRef}
                isDraggingOver={snapshot.isDraggingOver}
                {...provided.droppableProps}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <NewCard column={column.id} />
        </div>
      )}
    </Draggable>
  );
};
export default List;
