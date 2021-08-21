import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { changeListTitle } from '../actions/data';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import NewCard from './NewCard';
import { BsThreeDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { toggleAddCard } from '../actions/menu';

//if min-height not declared in tasklist, drop area height will be 0px

const List = ({ column, tasks, index }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [menuShow, setMenuShow] = useState(false);

  const dispatch = useDispatch();
  const textInput = useRef('');
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

  useEffect(() => {
    const listener = (event) => {
      event.preventDefault();
      setMenuShow(false);
    };
    if (menuShow === true) {
      document.addEventListener('click', listener);
    }
    return () => document.removeEventListener('click', listener);
  }, [menuShow]);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <React.Fragment>
          <div
            className='list-container'
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {show === false ? (
              <div className='title-div'>
                <h3
                  className='title'
                  {...provided.dragHandleProps}
                  onClick={() => setShow(true)}
                >
                  {column.title}
                </h3>
                <BsThreeDots
                  className='icon'
                  onClick={() => setMenuShow(menuShow === false ? true : false)}
                />
                {menuShow === true ? (
                  <div className='list-menu-div'>
                    <div className='list-menu-header'>
                      <span>List actions</span>
                      <IoClose
                        className='list-menu-icon'
                        onClick={() => setMenuShow(false)}
                      />
                    </div>
                    <div className='list-menu-main'>
                      <span
                        onClick={() => {
                          dispatch(toggleAddCard(true, column.id));
                          // setMenuShow(false);
                        }}
                      >
                        Add card...
                      </span>
                      <span>Copy list...</span>
                      <span>Move list...</span>
                      <span>Sort by...</span>
                    </div>
                  </div>
                ) : null}
              </div>
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
            {/* <NewCardMemo column={column.id} /> */}
          </div>
        </React.Fragment>
      )}
    </Draggable>
  );
};
export default List;
