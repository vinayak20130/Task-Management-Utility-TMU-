import React, {useState} from 'react';
import PropTypes from 'prop-types';
import UilEditAlt from '@iconscout/react-unicons/icons/uil-edit-alt';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilAngleDown from '@iconscout/react-unicons/icons/uil-angle-down';
import UilAngleUp from '@iconscout/react-unicons/icons/uil-angle-up';
import dayjs from 'dayjs';
import './Card.css';

function NoteCard({ data, onDelete, onEdit }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { title, key, description, dueDate, label } = data;
  const formattedDueDate = dayjs(dueDate).format('DD-MM-YYYY');
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`card card-${label}`}>
    <div className='content-wrapper'>
      <div className="header">
        <h4>
          <span>{title}</span>
        </h4>
        <div className="actions">
          <span>
            <UilEditAlt onClick={() => onEdit(key)} />
            <UilTrashAlt onClick={() => onDelete(key)} />
          </span>
        </div>
      </div>
      <p>{isExpanded ? description : `${description.substring(0, 101)}...`}</p>
      {description.length > 100 && 
      <div onClick={toggleDescription}>
        {isExpanded ? <UilAngleUp/> : <UilAngleDown/>}
      </div>
    }
      </div>
      <div className="duedate">
        <p>{formattedDueDate}</p>
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
