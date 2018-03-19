import { API_ADDRESS } from '../config/connections';

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
    console.log(username, password);
    axios.post(API_ADDRESS + '/api/user/login', {
      Email: username,
      Password: password,
    })
      .then((response) => {
        dispatch(postUserLoading(false));
        return response;
      })
      .then(() => dispatch(postUserSuccess(true)))
      .catch(() => dispatch(postUserFailure(true)));
  };
}
