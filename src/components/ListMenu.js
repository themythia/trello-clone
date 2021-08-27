import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';

const ListMenu = () => {
  const [menuState, setMenuState] = useState('menu');
  console.log('menuState', menuState);
  return (
    <div className='list-menu-div' ref={listMenu}>
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
export default ListMenu;
