import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import NewCard from './NewCard';
import ListMenu from './ListMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { changeListTitle, toggleListMenu } from '../actions/data';
import { getScrollHeight } from '../actions/menu';
import { BsThreeDots } from 'react-icons/bs';

const List = ({ column, tasks, index }) => {
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [input, setInput] = useState(column.title);
  const listMenu = useRef(null);

  const showMenu = useSelector(
    (store) => store.data.demo.columns[column.id].showMenu
  );

  // for optimizing purposes
  const Cards = React.memo(function Cards({ tasks }) {
    return tasks.map((task, index) => (
      <Card key={task.id} task={task} index={index} column={column} />
    ));
  });

  // if textInput isn't empty,
  // dispatches new list title to store,
  // hides textInput
  const changeTitle = () => {
    if (input.length > 0) {
      dispatch(changeListTitle(input, column.id));
    }
    if (input.length === 0) {
      setInput(column.title);
    }
    setShowInput(false);
  };

  // listens for enter key to invoke changeTitle() on key press
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
        changeTitle();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [input]);

  useEffect(() => {
    // listens for clicks,
    // if clicked outside of list menu
    // hides the menu
    const listener = (e) => {
      if (listMenu.current && !listMenu.current.contains(e.target)) {
        if (e.target.className !== 'list-menu-item') {
          e.preventDefault();
          dispatch(toggleListMenu(false, column));
        }
      }
    };
    // only adds the eventListener if menu is active
    if (showMenu === true) {
      document.addEventListener('click', listener);
    }
    return () => document.removeEventListener('click', listener);
  }, [showMenu]);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <React.Fragment>
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='list-container'
          >
            {showInput === false ? (
              <div className='title-div'>
                <h3
                  {...provided.dragHandleProps}
                  className='title'
                  onClick={() => setShowInput(true)}
                >
                  {column.title}
                </h3>
                <BsThreeDots
                  className='icon'
                  onClick={() =>
                    dispatch(
                      toggleListMenu(showMenu === false ? true : false, column)
                    )
                  }
                />
                {showMenu && (
                  <ListMenu column={column} index={index} ref={listMenu} />
                )}
              </div>
            ) : (
              <input
                {...provided.dragHandleProps}
                type='text'
                value={input}
                autoFocus
                onChange={(e) => setInput(e.target.value)}
                onBlur={changeTitle}
              ></input>
            )}

            <Droppable droppableId={column.id} type='task'>
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className='card-list'
                  onScroll={(e) => {
                    dispatch(getScrollHeight(column.id, e.target.scrollTop));
                  }}
                >
                  <Cards tasks={tasks} />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <NewCard column={column.id} />
          </div>
        </React.Fragment>
      )}
    </Draggable>
  );
};
export default List;
