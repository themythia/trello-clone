import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BiPlus } from 'react-icons/bi';
import { addNewCard } from '../actions/data';
import { IoClose } from 'react-icons/io5';

const NewCard = ({ column }) => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const inputField = useRef();

  const dispatch = useDispatch();

  const newCard = () => {
    if (input.length > 0) {
      dispatch(addNewCard(input, column));
      setInput('');
      setShow(false);
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
        newCard();
      }
    };
    document.addEventListener('keydown', listener);
    return () => document.removeEventListener('keydown', listener);
  }, [input]);

  return (
    <React.Fragment>
      {show === false ? (
        <span className='add-new-card-btn' onClick={() => setShow(true)}>
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
                setShow(false);
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
