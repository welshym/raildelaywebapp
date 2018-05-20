import AppDispatcher from '../AppDispatcher';
import DelaysConstants from '../Constants/DelaysConstants';
import DelaysAPI from '../APIs/DelaysAPI';

// Define action methods
let DelaysActions = {

  // Receive headline data
  receiveDelays(departureStation, arrivalStation, fromDate, toDate) {
    DelaysAPI.getDelayData(departureStation, arrivalStation, fromDate, toDate).then((data) => {
      AppDispatcher.handleAction({
        actionType: DelaysConstants.TRAINDELAYS_RECEIVE_DATA,
        data
      });
    });
  }
};

export default DelaysActions;

