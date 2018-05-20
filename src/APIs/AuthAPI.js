const sampleSuccessResponse = { loggedIn: true, error: false, token: '123456' };
const sampleErrorResponse = { loggedIn: true, error: true, token: '123456' };

const AuthAPI = {
  login: (username, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(sampleErrorResponse); }, 2000);
    });
  },

  registerReset: (emailAddress) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => { resolve(sampleErrorResponse); }, 2000);
    });
  }
};

export default AuthAPI;
