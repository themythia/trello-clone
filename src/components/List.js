import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeListTitle,
  copyList,
  deleteAllCards,
  deleteList,
  sortList,
} from '../actions/data';
import Card from './Card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import NewCard from './NewCard';
import { BsThreeDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { toggleAddCard } from '../actions/menu';
import { AiOutlineLeft } from 'react-icons/ai';

//if min-height not declared in tasklist, drop area height will be 0px

const List = ({ column, tasks, index }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [menuShow, setMenuShow] = useState(false);
  const [menuState, setMenuState] = useState('menu');

  const dispatch = useDispatch();
  const textInput = useRef('');
  const listMenu = useRef(null);
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
      if (
        listMenu &&
        listMenu.current &&
        !listMenu.current.contains(event.target)
      ) {
        if (event.target.className !== 'list-menu-item') {
          event.preventDefault();
          setMenuShow(false);
          setMenuState('menu');
        }
      }
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
                  <React.Fragment>
                    <div className='list-menu-div' ref={listMenu}>
                      <div className='list-menu-header'>
                        <AiOutlineLeft
                          onClick={() => setMenuState('menu')}
                          className='list-menu-icon'
                          style={{
                            visibility: menuState !== 'sort' && 'hidden',
                          }}
                        />
                        <span>
                          {menuState === 'sort' ? `Sort List` : `List actions`}
                        </span>
                        <IoClose
                          className='list-menu-icon'
                          onClick={() => setMenuShow(false)}
                        />
                      </div>
                      <div className='list-menu-main'>
                        {menuState === 'menu' ? (
                          <React.Fragment>
                            <span
                              className='list-menu-item'
                              onClick={() => {
                                dispatch(toggleAddCard(true, column.id));
                                setMenuShow(false);
                              }}
                            >
                              Add card...
                            </span>
                            <span
                              className='list-menu-item'
                              onClick={() => {
                                dispatch(copyList(column, index));
                                setMenuShow(false);
                              }}
                            >
                              Copy list...
                            </span>
                            <span
                              onClick={() => setMenuState('sort')}
                              className='list-menu-item'
                            >
                              Sort by...
                            </span>
                            <span
                              onClick={() => dispatch(deleteAllCards(column))}
                              className='list-menu-item'
                            >
                              Delete all cards in this list
                            </span>
                            <span
                              onClick={() => dispatch(deleteList(column))}
                              className='list-menu-item'
                            >
                              Delete this list
                            </span>
                          </React.Fragment>
                        ) : null}
                        {menuState === 'sort' ? (
                          <React.Fragment>
                            <span
                              onClick={() =>
                                dispatch(sortList(column, 'newest'))
                              }
                              className='list-menu-item'
                            >
                              Date created (newest first)
                            </span>
                            <span
                              onClick={() =>
                                dispatch(sortList(column, 'oldest'))
                              }
                              className='list-menu-item'
                            >
                              Date created (oldest first)
                            </span>
                            <span
                              onClick={() => dispatch(sortList(column, 'abc'))}
                              className='list-menu-item'
                            >
                              Card name (alphabetically)
                            </span>
                          </React.Fragment>
                        ) : null}
                      </div>
                    </div>
                  </React.Fragment>
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
