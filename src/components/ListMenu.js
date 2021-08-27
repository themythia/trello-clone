import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAddCard, addListMenuColumn } from '../actions/menu';
import {
  copyList,
  deleteAllCards,
  deleteList,
  sortList,
  toggleListMenu,
} from '../actions/data';
import { IoClose } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';

const ListMenu = (props, ref) => {
  const { column, index } = props;
  const dispatch = useDispatch();
  const showMenu = useSelector(
    (store) => store.data.demo.columns[column.id].showMenu
  );
  const [menuState, setMenuState] = useState('menu');
  return (
    <div className='list-menu-div' ref={ref}>
      <div className='list-menu-header'>
        <AiOutlineLeft
          onClick={() => setMenuState('menu')}
          className='list-menu-icon'
          style={{
            visibility: menuState !== 'sort' && 'hidden',
          }}
        />
        <span>{menuState === 'sort' ? `Sort List` : `List actions`}</span>
        <IoClose
          className='list-menu-icon'
          // onClick={() => setMenuShow(false)}
          onClick={() => dispatch(toggleListMenu(false, column))}
        />
      </div>
      <div className='list-menu-main'>
        {menuState === 'menu' ? (
          <React.Fragment>
            <span
              className='list-menu-item'
              onClick={() => {
                dispatch(toggleAddCard(true, column.id));
                dispatch(toggleListMenu(false, column));
              }}
            >
              Add card...
            </span>
            <span
              className='list-menu-item'
              onClick={() => {
                dispatch(copyList(column, index));
                dispatch(toggleListMenu(false, column));
                dispatch(addListMenuColumn(column));
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
              onClick={() => {
                dispatch(deleteAllCards(column));
                dispatch(toggleListMenu(false, column));
              }}
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
              onClick={() => dispatch(sortList(column, 'newest'))}
              className='list-menu-item'
            >
              Date created (newest first)
            </span>
            <span
              onClick={() => dispatch(sortList(column, 'oldest'))}
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
  );
};

const forwardedListMenu = React.forwardRef(ListMenu);
export default forwardedListMenu;
