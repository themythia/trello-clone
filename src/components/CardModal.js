import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsCardText,
  BsFillTagFill,
  BsCardImage,
  BsTrashFill,
} from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { changeCardContent } from '../actions/data';
import CardModalMenu from './CardModalMenu';
import { toggleCardModal, toggleCardModalMenu } from '../actions/data';
import { toggleEditLabel } from '../actions/labels';

const CardModal = ({ show, onClose, task }) => {
  const [input, setInput] = useState(task.content);
  // const showModalMenu = useSelector(
  //   (store) => store.menu.tasks[task.id].showCardModalMenu
  // );
  const showModalMenu = useSelector(
    (store) => store.data.demo.tasks[task.id].showCardModalMenu
  );
  const editLabel = useSelector((store) =>
    store.labels.find((label) => label.edit === true)
  );

  const position = useSelector((store) => store.menu.tasks[task.id].position);
  const textarea = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    textarea.current?.select();
  }, []);

  const windowSize = useMemo(() => {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, []);

  if (show === false) {
    return null;
  }

  return (
    <div className='card-modal-div' onClick={onClose}>
      <div
        style={{
          top: position?.top - windowSize.height / 2 + 80,
          left:
            position?.left - windowSize.width / 2 + position?.width / 2 + 60,
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
              if (input.length > 0) {
                dispatch(changeCardContent(task, input));
                dispatch(toggleCardModal(false, task));
              }
            }}
            className='text-save-btn'
          >
            Save
          </button>
        </div>
        <div className='right'>
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'card'));
            }}
            className='side-btn'
          >
            <BsCardText size={16} className='side-btn-icon' /> Open card
          </button>
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'label'));
            }}
            className='side-btn'
          >
            <BsFillTagFill size={16} className='side-btn-icon' /> Edit labels
          </button>
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'cover'));
            }}
            className='side-btn'
          >
            <BsCardImage size={16} className='side-btn-icon' /> Change cover
          </button>
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'copy'));
            }}
            className='side-btn'
          >
            <FaCopy size={16} className='side-btn-icon' /> Copy
          </button>
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'delete'));
            }}
            className='side-btn'
          >
            <BsTrashFill size={16} className='side-btn-icon' /> Delete
          </button>
        </div>
        {showModalMenu === true && (
          <CardModalMenu
            onClose={() => {
              dispatch(toggleEditLabel(editLabel?.id, false));
              dispatch(toggleCardModalMenu(false, task));
            }}
            task={task}
          />
        )}
      </div>
    </div>
  );
};
export default CardModal;
