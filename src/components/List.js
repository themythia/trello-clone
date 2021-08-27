import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import NewCard from './NewCard';
import ListMenu from './ListMenu';
import { useDispatch, useSelector } from 'react-redux';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import {
  changeListTitle,
  copyList,
  deleteAllCards,
  deleteList,
  sortList,
  toggleListMenu,
} from '../actions/data';
import { toggleAddCard } from '../actions/menu';
import { BsThreeDots } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';

const List = ({ column, tasks, index }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [input, setInput] = useState(column.title);
  // const [menuShow, setMenuShow] = useState(false);
  // const [menuState, setMenuState] = useState('menu');
  const textInput = useRef(null); //unused
  const listMenu = useRef(null);

  const showMenu = useSelector(
    (store) => store.data.demo.columns[column.id].showMenu
  );

  const InnerList = React.memo(function InnerList({ tasks }) {
    return tasks.map((task, index) => (
      <Card key={task.id} task={task} index={index} column={column} />
    ));
  });
  // if textInput isn't empty,
  // dispatches new list title to store,
  // resets textInput value,
  // hides textInput
  const changeTitle = () => {
    if (input.length > 0) {
      dispatch(changeListTitle(input, column.id));
    }
    if (input.length === 0) {
      setInput(column.title);
    }
    setShow(false);
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
      if (
        listMenu &&
        listMenu.current &&
        !listMenu.current.contains(e.target)
      ) {
        if (e.target.className !== 'list-menu-item') {
          e.preventDefault();
          dispatch(toggleListMenu(false, column));
        }
      }
    };
    // only adds the eventListener if menu is showing
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
                  onClick={() =>
                    dispatch(
                      toggleListMenu(showMenu === false ? true : false, column)
                    )
                  }
                  // onClick={() => setMenuShow(menuShow === false ? true : false)}
                />
                {showMenu === true ? (
                  <ListMenu column={column} index={index} ref={listMenu} />
                ) : // <React.Fragment>
                //   <div className='list-menu-div' ref={listMenu}>
                //     <div className='list-menu-header'>
                //       <AiOutlineLeft
                //         onClick={() => setMenuState('menu')}
                //         className='list-menu-icon'
                //         style={{
                //           visibility: menuState !== 'sort' && 'hidden',
                //         }}
                //       />
                //       <span>
                //         {menuState === 'sort' ? `Sort List` : `List actions`}
                //       </span>
                //       <IoClose
                //         className='list-menu-icon'
                //         onClick={() => setMenuShow(false)}
                //       />
                //     </div>
                //     <div className='list-menu-main'>
                //       {menuState === 'menu' ? (
                //         <React.Fragment>
                //           <span
                //             className='list-menu-item'
                //             onClick={() => {
                //               dispatch(toggleAddCard(true, column.id));
                //               setMenuShow(false);
                //             }}
                //           >
                //             Add card...
                //           </span>
                //           <span
                //             className='list-menu-item'
                //             onClick={() => {
                //               dispatch(copyList(column, index));
                //               setMenuShow(false);
                //             }}
                //           >
                //             Copy list...
                //           </span>
                //           <span
                //             onClick={() => setMenuState('sort')}
                //             className='list-menu-item'
                //           >
                //             Sort by...
                //           </span>
                //           <span
                //             onClick={() => dispatch(deleteAllCards(column))}
                //             className='list-menu-item'
                //           >
                //             Delete all cards in this list
                //           </span>
                //           <span
                //             onClick={() => dispatch(deleteList(column))}
                //             className='list-menu-item'
                //           >
                //             Delete this list
                //           </span>
                //         </React.Fragment>
                //       ) : null}
                //       {menuState === 'sort' ? (
                //         <React.Fragment>
                //           <span
                //             onClick={() =>
                //               dispatch(sortList(column, 'newest'))
                //             }
                //             className='list-menu-item'
                //           >
                //             Date created (newest first)
                //           </span>
                //           <span
                //             onClick={() =>
                //               dispatch(sortList(column, 'oldest'))
                //             }
                //             className='list-menu-item'
                //           >
                //             Date created (oldest first)
                //           </span>
                //           <span
                //             onClick={() => dispatch(sortList(column, 'abc'))}
                //             className='list-menu-item'
                //           >
                //             Card name (alphabetically)
                //           </span>
                //         </React.Fragment>
                //       ) : null}
                //     </div>
                //   </div>
                // </React.Fragment>
                null}
              </div>
            ) : (
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={textInput}
                autoFocus
                onBlur={changeTitle}
                {...provided.dragHandleProps}
              ></input>
            )}

            <Droppable droppableId={column.id} type='task'>
              {(provided, snapshot) => (
                <div
                  className='card-list'
                  ref={provided.innerRef}
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
