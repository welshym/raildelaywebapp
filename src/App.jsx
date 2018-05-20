import React, { Component } from 'react';
import DelayConfig from './components/DelayConfig';
import TrainDelayList from './components/TrainDelayList';

class Application extends Component {
  render() {
    console.log('Rendering Application');
    return (
      <div>
        <DelayConfig />
        <TrainDelayList />
      </div>
    );
  }
}

export default Application;

