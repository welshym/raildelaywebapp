import React from 'react';
import PropTypes from 'prop-types';
import './Delay.css';

function Delay(props) {
  return (
    <div className="delay">
      <div className="delay-details">{props.name}</div>
      <div className="delay-minutes">{props.delaysMinutes}minutes</div>
    </div>
  );
}

Delay.propTypes = {
  name: PropTypes.string.isRequired,
  delaysMinutes: PropTypes.number.isRequired
};

export default Delay;
