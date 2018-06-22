const sampleSuccessResponse = { loggedIn: true, error: false, token: '123456' };
//const sampleErrorResponse = { loggedIn: false, error: true, token: '123456' };

const AuthAPI = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(sampleSuccessResponse); }, 2000);
    });
  },

  registerReset: (emailAddress) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(sampleSuccessResponse); }, 2000);
    });
  }
};

export default AuthAPI;
