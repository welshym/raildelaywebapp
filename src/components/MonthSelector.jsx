import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';
import PropTypes from 'prop-types';

import './MonthSelector.css';

class MonthSelector extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.state = {
      from: undefined,
      to: undefined,
    };
  }
  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.props.onFromChange(from);
    console.log(from);
  }

  handleToChange(to) {
    this.setState({ to });
    this.props.onToChange(to);
    console.log(to);
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <span className="InputFromTo">
        <DayPickerInput name={this.props.fromName}
          value={from}
          placeholder="From"
          format="LL"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 1,
          }}
          onDayChange={this.handleFromChange}
        />{' '}
        <span className="InputFromTo-to">
          <DayPickerInput name={this.props.toName}
            ref={el => (this.to = el)}
            value={to}
            placeholder="To"
            format="LL"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 1,
            }}
            onDayChange={this.handleToChange}
          />
        </span>
      </span>
    );
  }
}


MonthSelector.propTypes = {
  fromName: PropTypes.string.isRequired,
  toName: PropTypes.string.isRequired,
  onFromChange: PropTypes.func.isRequired,
  onToChange: PropTypes.func.isRequired
};

export default MonthSelector;
