import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiPlus } from 'react-icons/bi';
import { addNewCard } from '../actions/data';
import { toggleAddCard } from '../actions/menu';
import { IoClose } from 'react-icons/io5';
import ID from '../utils/generateId';

const NewCard = ({ column, cardShow }) => {
  const [input, setInput] = useState('');
  const inputField = useRef();
  const dispatch = useDispatch();
  const addCard = useSelector((store) => store.menu[column]?.addCard);

  useEffect(() => {
    dispatch(toggleAddCard(false, column));
  }, [column]);

  const newCard = () => {
    const id = ID();
    if (input.length > 0) {
      dispatch(addNewCard(input, column, id));
      setInput('');
      // setShow(false);
      dispatch(toggleAddCard(false, column));
    }
  };
  const reset = () => {
    setInput('');
    // setShow(false);
    dispatch(toggleAddCard(false, column));
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        newCard();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [input]);

  return (
    <React.Fragment>
      {addCard !== true ? (
        <span
          className='add-new-card-btn'
          onClick={() => dispatch(toggleAddCard(true, column))}
        >
          <BiPlus size={24} /> Add a card
        </span>
      ) : (
        <div className='add-new-card-menu'>
          <textarea
            type='text'
            value={input}
            placeholder='Enter a title for this card...'
            onChange={(e) => setInput(e.target.value)}
            ref={inputField}
            onBlur={() => {
              if (input.length === 0) {
                dispatch(toggleAddCard(false, column));
              }
            }}
            autoFocus
          />
          <div className='btn-div'>
            <button onClick={newCard}>Add Card</button>
            <button className='transparent' onClick={reset}>
              <IoClose size={24} />
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};
export default NewCard;
