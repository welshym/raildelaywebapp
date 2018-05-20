import AppDispatcher from '../AppDispatcher';
import AuthConstants from '../Constants/AuthConstants';
import AuthAPI from '../APIs/AuthAPI';

// Define action methods
let AuthActions = {

  // Attempt to login
  login(username, password) {
    AuthAPI.login(username, password).then((data) => {
      AppDispatcher.handleAction({
        actionType: AuthConstants.LOGIN,
        data
      });
    });
  }
};

export default AuthActions;

