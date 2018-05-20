import AppDispatcher from '../AppDispatcher';
import EventEmitter from 'events';
import AuthConstants from '../Constants/AuthConstants';
import _ from 'underscore';

// Define initial data
let _authData = {};

// Method to load authorization data from API
function loadAuthData(data) {
  _authData.loggedIn = data.loggedIn;
  _authData.error = data.error;
  _authData.token = data.token;
}

let AuthStore = _.extend({}, EventEmitter.prototype, {

  // Return login data
  getAuthData() {
    return _authData;
  },

  // Emit Change event
  emitChange() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener(callback) {
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
    // Respond to LOGIN action
    case AuthConstants.LOGIN:
      loadAuthData(action.data);
      // If action was responded to, emit change event
      AuthStore.emitChange();
      break;

    default:
      return true;
  }


  return true;
});

export default AuthStore;
