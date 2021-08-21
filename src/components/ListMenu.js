import React from 'react';
import { IoClose } from 'react-icons/io5';

const ListMenu = () => {
  return (
    <div className='list-menu-div'>
      <div className='list-menu-header'>
        <span>List actions</span>
        <IoClose className='list-menu-icon' />
      </div>
      <div className='list-menu-main'>
        <span>Add card...</span>
        <span>Copy list...</span>
        <span>Move list...</span>
        <span>Sort by...</span>
      </div>
    </div>
  );
};
export default ListMenu;
