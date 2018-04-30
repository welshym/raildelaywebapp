import React from 'react';
import DelaysAction from '../Actions/DelaysActions';
import StationSelector from './StationSelector';
import MonthSelector from './MonthSelector';

// Add store to hold the station data. One store to hold "to" and one for "from
// Define the "to" and the "from" by passing in a prop to each form entry
// The submit will sit outside and will trigger the search of the DB which updates
// the delay store and triggers a render to display the delay information.

const stationList = ['PTR', 'WAT'];

class DelayConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueDeparture: 'PTR',
      valueDestination: 'PTR',
      fromDate: undefined,
      toDate: undefined
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDepartureChange = this.handleDepartureChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let fromDate = this.state.fromDate;
    let toDate = this.state.toDate;

    console.log(fromDate);
    console.log(toDate);
    if (fromDate === undefined) {
      fromDate = new Date();
      toDate = new Date();
    }

    if (toDate === undefined) {
      toDate = fromDate;
    }

    DelaysAction.receiveDelays(this.state.valueDeparture, this.state.valueDestination, fromDate.toDateString(), toDate.toDateString());
  }

  handleDepartureChange(valueDeparture) {
    console.log('DelayConfig handleDepartureChange: value ', valueDeparture);
    this.setState( { valueDeparture });
  }

  handleDestinationChange(valueDestination) {
    console.log('DelayConfig handleDestinationChange: value ', valueDestination);
    this.setState( { valueDestination });
  }

  handleFromChange(fromDate) {
    console.log('DelayConfig handleFromChange: value ', fromDate);
    this.setState( { fromDate });
  }

  handleToChange(toDate) {
    console.log('DelayConfig handleToChange: value ', toDate);
    this.setState( { toDate });
  }

  render() {
    console.log('Rendering Stations');
    // Render the DOM elements
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Departure station:
          <StationSelector name="departure" onChange={this.handleDepartureChange} stationList={stationList}/>
        </label>
        <label>
          Destination station:
          <StationSelector name="destination" onChange={this.handleDestinationChange} stationList={stationList}/>
        </label>
        <MonthSelector fromName="fromName" onFromChange={this.handleFromChange} toName="toName" onToChange={this.handleToChange}/>
        <input type="submit" value="Submit" />
      </form>
    );
  }
};


export default DelayConfig;
