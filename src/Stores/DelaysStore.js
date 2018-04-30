import AppDispatcher from '../AppDispatcher';
import EventEmitter from 'events';
import DelaysConstants from '../Constants/DelaysConstants';
import _ from 'underscore';

// Define initial data points
let _delayData = [];

// Method to load weather data from API
function loadDelayData(data) {
  _delayData.splice(); // removes all elements
  _delayData = data.slice();
  console.log('DELAYSSTORE: delays data', _delayData);
}

// Extend HeadlineStore with EventEmitter to add eventing capabilities
let DelaysStore = _.extend({}, EventEmitter.prototype, {

  // Return headline data
  getDelaysData() {
    return _delayData;
  },

  // Emit Change event
  emitChange() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener(callback) {
    console.log('Delay addChangeListener');
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register((payload) => {
  let action = payload.action;
  switch (action.actionType) {
    // Respond to RECEIVE_DATA action
    case DelaysConstants.TRAINDELAYS_RECEIVE_DATA:
      loadDelayData(action.data);
      // If action was responded to, emit change event
      DelaysStore.emitChange();
      break;

    default:
      return true;
  }


  return true;
});

export default DelaysStore;
