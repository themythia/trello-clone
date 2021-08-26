import React from 'react';
import { IoMdListBox } from 'react-icons/io';

const Nav = () => {
  return (
    <div className='nav-div'>
      <div className='nav-top'>
        <IoMdListBox size={22} style={{ verticalAlign: 'middle' }} />
        <span>Trello-Clone</span>
      </div>
      <div className='nav-bottom'></div>
    </div>
  );
};
export default Nav;
