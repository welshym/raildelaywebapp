import React from 'react';
import PropTypes from 'prop-types';
import DelaysStore from '../Stores/DelaysStore';
import './DelayList.css';

// import the Delay component
import Delay from './Delay';

class DelayList extends React.Component {
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
    console.log('DELAYLIST: Delay data in component', DelaysStore.getDelaysData());
  }

  render() {
    return (
      <div className="delayList">
        <h1 className="delay-title">Delays for some date</h1>
        <div>{this.props.delays.map(c => <Delay key={c.id} delaysMinutes={c.delaysMinutes} name={c.name} />)}</div>
      </div>
    );
  };
};

DelayList.propTypes = {
  delays: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DelayList;
