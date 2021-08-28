import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleNewList } from '../actions/data';
import { BiPlus } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import ID from '../utils/generateId';

const NewList = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const textInput = useRef();
  const dispatch = useDispatch();

  // if textInput isn't empty,
  // dispatches new list to store,
  // resets textInput value,
  // focuses textInput for next input
  const addNewList = () => {
    const id = ID();
    if (input.length > 0) {
      dispatch(handleNewList(input, id));
      setInput('');
      textInput.current.focus();
    }
  };

  const reset = () => {
    setInput('');
    setShow(false);
  };

  // listens for enter key to invoke addNewList() on key press
  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') {
        e.preventDefault();
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
            ref={textInput}
            placeholder='Enter list title...'
            autoFocus
            onChange={(e) => setInput(e.target.value)}
            onBlur={() => {
              if (input.length === 0) {
                setShow(false);
              }
            }}
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
