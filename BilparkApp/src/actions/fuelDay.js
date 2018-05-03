import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const POST_FUELDAY_REQUEST = 'POST_FUELDAY_REQUEST';
export const POST_FUELDAY_FAILURE = 'POST_FUELDAY_FAILURE';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';

export function showModal() {
  return {
    type: SHOW_MODAL,
  };
}
export function hideModal() {
  return {
    type: HIDE_MODAL,
  };
}

export function postFuelDayFailure(bool) {
  return {
    type: 'POST_FUELDAY_FAILURE',
    hasErrored: bool,
  };
}
export function postFuelDayLoading(bool) {
  return {
    type: 'POST_FUELDAY_REQUEST',
    isLoading: bool,
  };
}
export function postFuelDaySuccess(user) {
  return {
    type: 'POST_USER_SUCCESS',
    isLoggedIn: true,
    user,
  };
}


export function postFuelDay(weekday, toggle, fueltime) {
  const params = {};

  if (weekday !== undefined) {
    params.FuelDay = weekday.toString();
  }
  if (toggle !== undefined) {
    params.FuelNotification = toggle.toString();
  }
  if (fueltime !== undefined) {
    params.FuelTime = fueltime.toString();
  }
  return (dispatch) => {
    dispatch(postFuelDayLoading(true));
    return axios.post(API_ADDRESS + '/api/user/notification', params)
      .then((response) => {
        dispatch(postFuelDayLoading(false));
        return response.data;
      })
      .then((user) => {
        dispatch(postFuelDaySuccess(user));
      })
      .catch(() => {
        dispatch(postFuelDayFailure(true));
      });
  };
}
