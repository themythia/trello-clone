import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { AiOutlineLeft } from 'react-icons/ai';

const ListMenu = () => {
  const [menuState, setMenuState] = useState('menu');
  console.log('menuState', menuState);
  return (
    <div className='list-menu-div'>
      {menuState === 'menu' ? (
        <React.Fragment>
          <div className='list-menu-header'>
            <span>List actions</span>
            <IoClose className='list-menu-icon' />
          </div>
          <div className='list-menu-main'>
            <span>Add card...</span>
            <span>Copy list...</span>
            <span onClick={() => setMenuState('move')}>Move list...</span>
            <span>Sort by...</span>
          </div>
        </React.Fragment>
      ) : menuState === 'move' ? (
        <React.Fragment>
          <div className='list-menu-header'>
            <AiOutlineLeft className='list-menu-icon' />
            <span>Move list</span>
            <IoClose className='list-menu-icon' />
          </div>
          <div className='list-menu-main'>
            <select name='' id=''>
              <option value=''>1</option>
              <option value=''>2</option>
              <option value=''>3</option>
              <option value=''>4</option>
            </select>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};
export default ListMenu;
