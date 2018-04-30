import React from 'react';
import PropTypes from 'prop-types';

class StationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    console.log('Rendering Stations');
    // Render the DOM elements
    return (
      <select name={this.props.name} onChange={this.handleChange}>
        {this.props.stationList.map((stationItem) => (<option key={stationItem} value={stationItem}>{stationItem}</option>))}
      </select>
    );
  }
};

StationSelector.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  stationList: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default StationSelector;
