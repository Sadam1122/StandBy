import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './Dropdown.css';

const Dropdown = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-wrapper">
      <div className="dropdown">
        <div className="dropdown-header" onClick={toggleDropdown}>
          <h3>{title}</h3>
          <span>{isOpen ? '▲' : '▼'}</span>
        </div>
        {isOpen && <div className="dropdown-content">{content}</div>}
      </div>
    </div>
  );
};

// Define prop types
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Dropdown;
