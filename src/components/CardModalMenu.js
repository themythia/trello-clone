import React from 'react';
import { IoClose } from 'react-icons/io5';
import { BsPencil } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { darken } from 'polished';
import { FaCheck } from 'react-icons/fa';
import { toggleLabel } from '../actions/data';
import { toggleCardModal } from '../actions/data';

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

const CardModalMenu = ({ onClose, task }) => {
  const dispatch = useDispatch();
  const labels = useSelector((store) => store.labels);
  // const type = useSelector((store) => store.menu.tasks[task.id].menuType);
  const type = useSelector((store) => store.data.demo.tasks[task.id].menuType);
  return (
    <div className='card-modal-menu-div'>
      <div className='card-modal-menu-header'>
        {type === 'label' && <span>Labels</span>}
        <IoClose className='card-modal-menu-icon' onClick={onClose} />
      </div>
      <div className='card-modal-menu-main'>
        <h6>LABELS</h6>
        <ul>
          {labels.map((label) => (
            <li key={label.id}>
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
                {task.labels?.find((mapLabel) => mapLabel.id === label.id) && (
                  <FaCheck />
                )}
              </LabelCard>
              <div className='edit-button'>
                <BsPencil className='label-card-edit-icon' size={14} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='card-modal-menu-footer'>
        <button className='create-new-label-btn'>Create a new label</button>
      </div>
    </div>
  );
};
export default CardModalMenu;
