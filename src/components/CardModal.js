import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsCardText,
  BsFillTagFill,
  BsCardImage,
  BsTrashFill,
} from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { changeCardContent } from '../actions/data';

const CardModal = ({ show, onClose, position, task }) => {
  const [height, setHeight] = useState(929);
  const [width, setWidth] = useState(1920);
  const [input, setInput] = useState(task.content);
  const textarea = useRef(null);

  const dispatch = useDispatch();
  console.log('task', task);

  useEffect(() => {
    textarea.current.select();
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
  }, []);

  if (show === false) {
    return null;
  }
  console.log('position', position);

  return (
    <div className='card-modal-div' onClick={onClose}>
      <div
        style={{
          top: position.top - height / 2 + 80,
          left: position.left - width / 2 + position.width / 2 + 60,
        }}
        className='card-modal-content'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='left'>
          <textarea
            ref={textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
            spellCheck={false}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              if (input.length > 0 && input !== task.content) {
                dispatch(changeCardContent(task, input));
              }
            }}
            className='text-save-btn'
          >
            Save
          </button>
        </div>
        <div className='right'>
          <button className='side-btn'>
            <BsCardText size={16} className='side-btn-icon' /> Open card
          </button>
          <button className='side-btn'>
            <BsFillTagFill size={16} className='side-btn-icon' /> Edit labels
          </button>
          <button className='side-btn'>
            <BsCardImage size={16} className='side-btn-icon' /> Change cover
          </button>
          <button className='side-btn'>
            <FaCopy size={16} className='side-btn-icon' /> Copy
          </button>
          <button className='side-btn'>
            <BsTrashFill size={16} className='side-btn-icon' /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default CardModal;
