import React from 'react';
import "./LectureCard.css"
import { useNavigate } from 'react-router-dom';

const LectureCard = ({ title, description, link }) => {
  const navigate = useNavigate();

  return (
    <div className="lecture-card">
      <h3>{title ? title : 'Title Not Available'}</h3>
      <p>{description}</p>
      <p><b>Link: </b>{link}</p>
    </div>
  );
};
LectureCard.defaultProps = {
    title: 'sdfghsdh',
  };

export default LectureCard;