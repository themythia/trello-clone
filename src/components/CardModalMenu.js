import React, { useState, useEffect, useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { FaCheck } from 'react-icons/fa';
import {
  toggleLabel,
  changeCardModalMenuType,
  deleteLabelFromTask,
} from '../actions/data';
import { AiOutlineLeft } from 'react-icons/ai';
import {
  toggleEditLabel,
  editLabel as editLabelFunc,
  createLabel,
} from '../actions/labels';
import { getSearchInput } from '../actions/menu';
import ID from '../utils/generateId';

const LabelCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 244px;
  height: 32px;
  border-radius: 4px;
  line-height: 20px;
  padding: 6px 12px;
  font-weight: 700;
  color: white;
  margin-right: 4px;
  position: relative;
  background-color: ${(props) => props.background};
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    box-shadow: -8px 0 ${(props) => darken(0.1, props.background)};
    padding-left: 20px;
  }
`;

const LabelColorPicker = styled.span`
  display: inline-block;
  width: 48px;
  height: 32px;
  margin: 0 8px 8px 0;
  background: ${(props) => props.background};
  cursor: pointer;
  transition: all 0.2s;
  color: white;
  text-align: center;
  line-height: 32px;
  border-radius: 4px;
  flex-basis: 48px;
  &:hover {
    background: ${(props) => lighten(0.1, props.background)};
  }
  &:nth-of-type(5n) {
    margin-right: 0;
  }
`;

const CardModalMenu = ({ onClose, task, windowSize, position }) => {
  const dispatch = useDispatch();
  const labels = useSelector((store) => store.labels);
  const [colorSelected, setColorSelected] = useState(null);
  const editLabel = useSelector((store) =>
    store.labels.find((label) => label.edit === true)
  );
  const searchInput = useSelector((store) => store.menu.searchInput);
  const regex = new RegExp(`(${searchInput})`, 'i');
  const searchInputRef = useRef(null);

  // const type = useSelector((store) => store.menu.tasks[task.id].menuType);
  const type = useSelector((store) => store.data.tasks[task.id].menuType);

  const [input, setInput] = useState(editLabel?.name ? editLabel.name : '');
  const colors = [
    '#61bd4f',
    '#f2d600',
    '#ff9f1a',
    '#eb5a46',
    '#c377e0',
    '#0079bf',
    '#00c2e0',
    '#51e898',
    '#ff78cb',
    '#344563',
  ];

  useEffect(() => {
    if (editLabel !== undefined && colorSelected === null) {
      setColorSelected(editLabel.color);
    }
  }, [editLabel, colorSelected]);

  // repositions the menu if menu overflows the y axis of window
  const menuPosition = () => {
    let top = 1;
    if (position.top + 460 > windowSize.height) {
      top = windowSize.height - (position.top + 468);
    }
    return top;
  };
  
  return (
    <div className='card-modal-menu-div' style={{ top: menuPosition() }}>
      {type === 'label' && (
        <React.Fragment>
          <div className='card-modal-menu-header'>
            <span>Labels</span>
            <IoClose className='card-modal-menu-icon' onClick={onClose} />
          </div>
          <div className='card-modal-menu-main'>
            <input
              type='search'
              placeholder='Search labels...'
              value={searchInput}
              ref={searchInputRef}
              autoFocus
              onChange={(e) => {
                dispatch(getSearchInput(e.target.value));
              }}
            />
            <h6>LABELS</h6>
            <ul>
              {labels
                .filter((label) => regex.test(label.name) === true)
                .map((label, index) => (
                  <li key={index}>
                    <LabelCard
                      background={label.color}
                      onClick={() => {
                        dispatch(toggleLabel(task, label));
                      }}
                    >
                      <span
                        style={{
                          textOverflow: 'ellipsis',
                          overflow: 'hidden',
                          whiteSpace: 'nowrap',
                          maxWidth: '190px',
                        }}
                      >
                        {label.name}
                      </span>
                      {task.labels?.find(
                        (mapLabel) => mapLabel.id === label.id
                      ) && <FaCheck />}
                    </LabelCard>
                    <div
                      onClick={() => {
                        dispatch(toggleEditLabel(label.id, true));
                        dispatch(changeCardModalMenuType(task, 'edit-label'));
                      }}
                      className='edit-button'
                    >
                      <BsPencil className='label-card-edit-icon' size={14} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className='card-modal-menu-footer'>
            <button
              onClick={() =>
                dispatch(changeCardModalMenuType(task, 'create-label'))
              }
              className='create-new-label-btn'
            >
              Create a new label
            </button>
          </div>
        </React.Fragment>
      )}
      {(type === 'edit-label' || type === 'create-label') && (
        <React.Fragment>
          <div className='card-modal-menu-header'>
            <AiOutlineLeft
              onClick={() => {
                if (type === 'edit-label') {
                  dispatch(toggleEditLabel(editLabel.id, false));
                }
                dispatch(changeCardModalMenuType(task, 'label'));
              }}
              className='card-modal-menu-icon'
            />
            <span>
              {type === 'edit-label'
                ? 'Change label'
                : type === 'create-label'
                ? 'Create label'
                : type === 'cover'
                ? 'Cover'
                : null}
            </span>
            <IoClose className='card-modal-menu-icon' onClick={onClose} />
          </div>
          <div className='card-modal-menu-main no-border-bottom'>
            {(type === 'create-label' || type === 'edit-label') && (
              <React.Fragment>
                <label htmlFor='text-input'>
                  <h6>Name</h6>
                </label>
                <input
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  id='text-input'
                />
              </React.Fragment>
            )}
            <h6>Select a color</h6>
            <div className='color-select-div'>
              {colors.map((color, index) => (
                <LabelColorPicker
                  key={index}
                  background={color}
                  onClick={() => setColorSelected(color)}
                >
                  {colorSelected === color && (
                    <FaCheck style={{ verticalAlign: 'middle' }} />
                  )}
                </LabelColorPicker>
              ))}
            </div>
            <div className='card-modal-menu-buttons'>
              <button
                onClick={() => {
                  if (input.length > 0) {
                    if (type === 'edit-label') {
                      dispatch(
                        editLabelFunc(editLabel.id, input, colorSelected)
                      );
                    }
                    if (type === 'create-label') {
                      if (colorSelected !== null) {
                        const id = ID();
                        dispatch(
                          createLabel({
                            id,
                            name: input,
                            color: colorSelected,
                            edit: false,
                          })
                        );
                      }
                    }
                    dispatch(changeCardModalMenuType(task, 'label'));
                  }
                }}
                className='btn-primary'
              >
                {type === 'edit-label'
                  ? `Save`
                  : type === 'create-label'
                  ? 'Create'
                  : null}
              </button>
              {type === 'edit-label' && (
                <button
                  onClick={() => {
                    dispatch(deleteLabelFromTask(editLabel.id));
                    dispatch(changeCardModalMenuType(task, 'label'));
                  }}
                  className='btn-danger'
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default CardModalMenu;
