import React, { Component } from 'react';
import swrLogo from './swr.png';
import './App.css';
import DelayConfig from './components/DelayConfig';
import TrainDelayList from './components/TrainDelayList';

class Application extends Component {
  render() {
    return (
        <div>
            <div className="App">
                <header className="App-header">
                    <img src={swrLogo} className="App-logo" alt="SWR Logo" />
                    <h1 className="App-title">South Western Railways - Train Delay Details</h1>
                </header>
                <DelayConfig />
                <TrainDelayList />
            </div>
        </div>
    );
  }
}

export default Application;

