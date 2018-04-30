import React from 'react';
import DelaysStore from '../Stores/DelaysStore';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './react-bootstrap-table.css';

class TrainDelayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDelays: []
    };
    this._onChange = this._onChange.bind(this);
  }
  componentWillMount() {
    DelaysStore.addChangeListener(this._onChange);
  }
  componentWillUnMount() {
    DelaysStore.removeChangeListener(this._onChange);
  }

  _onChange() {
    let newData = { delays: this.processDelayData(DelaysStore.getDelaysData()) };
    console.log('TRAINDELAYLIST: Delay data in component', newData);
    this.setState(newData);
  }

  formatDate(timestamp) {
    let date = new Date(timestamp);
    let monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  formatTime(timestamp) {
    let date = new Date(timestamp);
    return date.getHours() + ':' + date.getMinutes();
  }

  processDelayData(delayData) {
    let processedData = [];

    console.log('processDelayData: delayData: ', delayData);
    for (let i = 0; i < delayData.length; i++) {
      let trainDetails = {};
      if (delayData[i].departureDetails !== undefined) {
        trainDetails.departureDetailsFullname = delayData[i].departureDetails.fullName;
        trainDetails.departureDetailsScheduledDate = this.formatDate( delayData[i].departureDetails.scheduledTimestamp );
        trainDetails.departureDetailsScheduledTime = this.formatTime( delayData[i].departureDetails.scheduledTimestamp );
        trainDetails.departureDetailsActualDate = this.formatDate( delayData[i].departureDetails.actualTimestamp );
        trainDetails.departureDetailsActualTime = this.formatTime( delayData[i].departureDetails.actualTimestamp );
      }
      if (delayData[i].arrivalDetails !== undefined) {
        trainDetails.arrivalDetailsFullname = delayData[i].arrivalDetails.fullName;
        trainDetails.arrivalDetailsScheduledDate = this.formatDate( delayData[i].arrivalDetails.scheduledTimestamp );
        trainDetails.arrivalDetailsScheduledTime = this.formatTime( delayData[i].arrivalDetails.scheduledTimestamp );
        trainDetails.arrivalDetailsActualDate = this.formatDate( delayData[i].arrivalDetails.actualTimestamp );
        trainDetails.arrivalDetailsActualTime = this.formatTime( delayData[i].arrivalDetails.actualTimestamp );
        trainDetails.delayInMinutes = Math.ceil( delayData[i].delayInSeconds / 60 );
      }
      processedData.push(trainDetails);
    }
    return processedData;
  }
  render() {
    console.log('Rendering TrainDelayList');

    let length = 0;
    if (this.state.delays !== undefined) {
      length = this.state.delays.length;
    }
    const options = {
      noDataText: 'No data available for this station + date selection.',
      sizePerPageList: [{
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: 'All', value: length
      }]
    };

    return (
      <BootstrapTable data={this.state.delays} pagination options={options}>
          <TableHeaderColumn dataField="departureDetailsFullname" isKey>Departure Station</TableHeaderColumn>
          <TableHeaderColumn dataField="departureDetailsScheduledDate">Scheduled Date</TableHeaderColumn>
          <TableHeaderColumn dataField="departureDetailsScheduledTime">Scheduled Time</TableHeaderColumn>
          <TableHeaderColumn dataField="departureDetailsActualDate">Actual Date</TableHeaderColumn>
          <TableHeaderColumn dataField="departureDetailsActualTime">Actual Time</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDetailsFullname">Arrival Station</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDetailsScheduledDate">Scheduled Date</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDetailsScheduledTime">Scheduled Time</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDetailsActualDate">Actual Date</TableHeaderColumn>
          <TableHeaderColumn dataField="arrivalDetailsActualTime">Actual Time</TableHeaderColumn>
          <TableHeaderColumn dataField="delayInMinutes">Delay Mins </TableHeaderColumn>
      </BootstrapTable>
    );
  }
};

export default TrainDelayList;
