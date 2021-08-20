import React, { useState, useRef, useEffect } from 'react';
import { handleNewList } from '../actions/data';
import { useDispatch } from 'react-redux';
import { BiPlus } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';

const NewList = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const inputField = useRef();
  const dispatch = useDispatch();

  const addNewList = () => {
    if (input.length > 0) {
      dispatch(handleNewList(input));
      setInput('');
      inputField.current.focus();
    }
  };
  const reset = () => {
    setInput('');
    setShow(false);
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        addNewList();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [input]);

  return (
    <React.Fragment>
      {show === false ? (
        <span className='add-new-list-btn' onClick={() => setShow(true)}>
          <BiPlus size={24} /> Add Another List
        </span>
      ) : (
        <div className='add-new-list-menu'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={inputField}
            onBlur={() => {
              if (input.length === 0) {
                setShow(false);
              }
            }}
            placeholder='Enter list title...'
            autoFocus
          />
          <div className='btn-div'>
            <button onClick={addNewList}>Add List</button>
            <button className='transparent' onClick={reset}>
              <IoClose size={24} />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default NewList;
