import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const GET_CAR_REQUEST = 'GET_CAR_REQUEST';
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS';
export const GET_CAR_FAILURE = 'GET_CAR_FAILURE';
export const GET_CAR_DECLINE = 'GET_CAR_DECLINE';
export const GET_CAR_ACCEPT = 'GET_CAR_ACCEPT';
export const GET_CAR_SAVE_FAILURE = 'GET_CAR_SAVE_FAILURE';
export const GET_CAR_FORM_VALUE = 'GET_CAR_FORM_VALUE';
export const UPDATE_CAR = 'UPDATE_CAR';

export function carFetchFailure(message) {
  return {
    type: GET_CAR_FAILURE,
    hasErrored: message,
  };
}
export function carFetchLoading(bool) {
  return {
    type: GET_CAR_REQUEST,
    isLoading: bool,
  };
}
export function carFetchSuccess(carObject) {
  return {
    type: GET_CAR_SUCCESS,
    car: carObject,
  };
}
export function carDeclined() {
  return {
    type: GET_CAR_DECLINE,
  };
}

export function carAccepted(bool) {
  return {
    type: GET_CAR_ACCEPT,
    isAccepted: bool,
  };
}

export function carSaveFailure(message) {
  return {
    type: GET_CAR_SAVE_FAILURE,
    hasErrored: message,
  };
}

export function carFormValue(value) {
  return {
    type: GET_CAR_FORM_VALUE,
    carFormValue: value,
  };
}

export function updateCar(car) {
  return {
    type: UPDATE_CAR,
    car,
  };
}

export function getCar(nr) {
  return (dispatch) => {
    dispatch(carFetchLoading(true));

    return axios.post(API_ADDRESS + '/api/dsm?regnr=' + nr)
      .then((response) => {
        if (!response.ok && !response.data) {
          dispatch(carFetchFailure('Noe gikk galt..'));
        }
        dispatch(carFetchSuccess(JSON.stringify(response.data)));
      })
      .catch((error) => {
        if (typeof (error.response.status) !== 'undefined') {
          if (error.response.status === 404) {
            dispatch(carFetchFailure('Registreringsnummeret finnes ikke!'));
          } else {
            dispatch(carFetchFailure('Noe gikk galt..'));
          }
        } else {
          dispatch(carFetchFailure('Noe gikk galt..'));
        }
      });
  };
}

export function acceptCar(car) {
  return (dispatch) => {

    return axios.post(API_ADDRESS + '/api/car/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      car,
    })
      .then((response) => {
        if (!response.ok && !response.status === 200) {
          dispatch(carSaveFailure('Noe gikk galt når bilen skulle lagres! Prøv igjen.'));
        }
        dispatch(carAccepted(true));
        dispatch(updateCar(car));
      })
      .catch(() => {
        dispatch(carSaveFailure('Noe gikk galt når bilen skulle lagres! Prøv igjen.'));
      });
  };
}

export function declineCar() {
  return (dispatch) => {
    dispatch(carDeclined());
  };
}
