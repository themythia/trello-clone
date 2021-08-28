import React, { useState, useEffect, useRef, useMemo } from 'react';
import CardModalMenu from './CardModalMenu';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillTagFill, BsTrashFill } from 'react-icons/bs';
import { FaCopy } from 'react-icons/fa';
import { changeCardContent, copyCard } from '../actions/data';
import {
  toggleCardModal,
  toggleCardModalMenu,
  deleteCard,
} from '../actions/data';
import { toggleEditLabel } from '../actions/labels';
import ID from '../utils/generateId';

const CardModal = ({ show, onClose, task, column }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(task.content);
  const textarea = useRef(null);

  const position = useSelector((store) => store.menu.tasks[task.id].position);
  const type = useSelector((store) => store.data.demo.tasks[task.id].menuType);
  const editLabel = useSelector((store) =>
    store.labels.find((label) => label.edit === true)
  );
  const showModalMenu = useSelector(
    (store) => store.data.demo.tasks[task.id].showCardModalMenu
  );

  const scrollTop = useSelector((store) => store.menu[column.id].scrollTop);
  console.log('scrollTop', scrollTop);

  useEffect(() => {
    if (type === undefined) {
      textarea.current?.select();
    }
  }, []);

  const windowSize = useMemo(() => {
    return {
      height: window.innerHeight,
      width: window.innerWidth,
    };
  }, []);

  const modalPosition = () => {
    let top = position?.top;
    let left = position?.left;

    if (position?.top > windowSize.height) {
      top = top - scrollTop;
    }
    if (top + 120 > windowSize.height) {
      top = windowSize.height - 130;
    }

    // if (position?.top + 82 > windowSize.height) {
    //   top = windowSize.height - 250;
    // }
    if (position?.left > windowSize.width) {
      left = windowSize.width;
    }
    // if (position?.top < 0) {
    //   top = 141;
    // }
    // if (position?.left < 0) {
    //   left = 26;
    // }
    if (position?.left + 354 > windowSize.width) {
      left = windowSize.width - 354;
    }
    // if (windowSize.height - position?.top < 120) {
    //   console.log('warning');
    //   top = windowSize.height - 250;
    // }
    return { top, left };
  };

  console.log(position);
  console.log('modalPosition', modalPosition());
  if (show === false) {
    return null;
  }

  return (
    <div className='card-modal-div' onClick={onClose}>
      <div
        style={{
          top: modalPosition().top - windowSize.height / 2 + 60,
          left:
            modalPosition().left -
            windowSize.width / 2 +
            position?.width / 2 +
            48,
        }}
        className='card-modal-content'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='left'>
          <textarea
            ref={textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
          {/* <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'card'));
            }}
            className='side-btn'
          >
            <BsCardText size={16} className='side-btn-icon' /> Open card
          </button> */}
          <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'label'));
            }}
            className='side-btn'
          >
            <BsFillTagFill size={16} className='side-btn-icon' /> Edit labels
          </button>
          {/* <button
            onClick={() => {
              dispatch(toggleCardModalMenu(true, task, 'cover'));
            }}
            className='side-btn'
          >
            <BsCardImage size={16} className='side-btn-icon' /> Change cover
          </button> */}
          <button
            onClick={() => {
              const id = ID();
              dispatch(copyCard(task, column, id));
              dispatch(toggleCardModal(false, task));
            }}
            className='side-btn'
          >
            <FaCopy size={16} className='side-btn-icon' /> Copy
          </button>
          <button
            onClick={() => {
              dispatch(deleteCard(task, column));
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
