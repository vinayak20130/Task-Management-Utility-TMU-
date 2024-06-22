import React from 'react';
import PropTypes from 'prop-types';
import UilEditAlt from '@iconscout/react-unicons/icons/uil-edit-alt';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import './Card.css';

function NoteCard({ data, onDelete, onEdit }) {
  const { title, key, description, dueDate, label } = data;

  return (
    <div className={`card card-${label}`}>
      <div className="header">
        <h4>
          <span>{title}</span>
          {/* <div className="actions">
          <span>
            <UilEditAlt onClick={() => onEdit(key)} />
            <UilTrashAlt onClick={() => onDelete(key)} />
          </span>
        </div> */}
        </h4>
        <div className="actions">
          <span>
            <UilEditAlt onClick={() => onEdit(key)} />
            <UilTrashAlt onClick={() => onDelete(key)} />
          </span>
        </div>
      </div>
      <p>{description}</p>
      <div className="duedate">
        <p>{dueDate}</p>
      </div>
    </div>
  );
}

NoteCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default NoteCard;
