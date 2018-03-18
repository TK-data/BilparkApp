const axios = require('axios');

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';

export function postUserFailure(bool) {
  return {
    type: 'POST_USER_FAILURE',
    hasErrored: bool,
  };
}
export function postUserLoading(bool) {
  return {
    type: 'POST_USER_REQUEST',
    isLoading: bool,
  };
}
export function postUserSuccess(bool) {
  return {
    type: 'POST_USER_SUCCESS',
    isLoggedIn: bool,
  };
}

export function postUser(username, password) {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    axios.post('https://localhost:1337/api/user/login', {
      Email: username,
      Password: password,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(postUserLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(() => dispatch(postUserSuccess(true)))
      .catch(() => {
        dispatch(postUserFailure(true));
      });
  };
}
