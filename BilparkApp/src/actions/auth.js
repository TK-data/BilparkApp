import { API_ADDRESS } from '../config/connections';

const axios = require('axios');


export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_MAIL = 'LOGIN_MAIL';
export const LOGIN_ERROR_FORM_OPTIONS = 'LOGIN_ERROR_FORM_OPTIONS';
export const LOGIN_RESET_FORM_OPTIONS = 'LOGIN_RESET_FORM_OPTIONS';
export const RESET_GET_CAR = 'RESET_GET_CAR';
export const USER_LOGOUT = 'USER_LOGOUT';

export function postUserFailure(bool) {
  return {
    type: 'POST_USER_FAILURE',
    hasErrored: bool,
    isLoggedIn: false,
  };
}
export function postUserLoading(bool) {
  return {
    type: 'POST_USER_REQUEST',
    isLoading: bool,
    isLoggedIn: false,
  };
}
export function postUserSuccess(object) {
  return {
    type: 'POST_USER_SUCCESS',
    isLoggedIn: true,
    user: object.user,
    car: object.car,
    company: object.company,
  };
}

export function loginSuccess() {
  return {
    type: 'LOGIN_SUCCESS',
  };
}

export function logoutSuccess(bool) {
  return {
    type: 'LOGOUT_SUCCESS',
    isLoggedIn: !bool,
  };
}

export function loginMail(mail) {
  return {
    type: 'LOGIN_MAIL',
    mail,
  };
}

export function loginErrorFormOptions() {
  return {
    type: 'LOGIN_ERROR_FORM_OPTIONS',
  };
}

export function loginResetFormOptions() {
  return {
    type: 'LOGIN_RESET_FORM_OPTIONS',
  };
}

export function resetGetCar() {
  return {
    type: RESET_GET_CAR,
  };
}

export function logoutLocal() {
  return {
    type: USER_LOGOUT,
  };
}

export function routeToCompanyScreen() {
  return {
    type: 'ROUTE_COMPANY_SCREEN',
  };
}

export function postUser(username, password) {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.post(API_ADDRESS + '/api/user/login', {
      Email: username,
      Password: password,
    })
      .then((response) => {
        dispatch(postUserLoading(false));
        return response.data;
      })
      .then((object) => {
        dispatch(postUserSuccess(object));
        dispatch(registerUserValues({}));
        dispatch(loginMail({}));
        dispatch(loginResetFormOptions());
        if (object.user.CompanyID) {
          dispatch(loginSuccess());
        } else {
          dispatch(routeToCompanyScreen());
        }
      })
      .catch(() => {
        dispatch(postUserFailure(true));
        dispatch(loginErrorFormOptions());
      });
  };
}

export function registerUserValues(values) {
  return {
    type: 'REGISTER_USER_VALUES',
    values,
  };
}


export function postCurrent() {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.get(API_ADDRESS + '/api/user/current')
      .then((response) => {
        dispatch(postUserLoading(false));
        return response.data;
      })
      .then((object) => {
        dispatch(postUserSuccess(object));
        if (object.user.CompanyID) {
          dispatch(loginSuccess());
        } else {
          // dispatch(routeToCompanyScreen());
        }
      })
      .catch(() => {
        dispatch(postUserFailure(true));
      });
  };
}

export function logout() {
  return (dispatch) => {
    dispatch(postUserLoading(true));
    return axios.get(API_ADDRESS + '/api/user/logout')
      .then(() => {
        dispatch(postUserLoading(false));
        //dispatch(resetGetCar());
        dispatch(logoutLocal());
        dispatch(logoutSuccess(true));
      })
      .catch(() => dispatch(logoutSuccess(false)));
  };
}
