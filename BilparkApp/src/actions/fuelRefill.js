import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const POST_FUELREFILL_REQUEST = 'POST_FUELDAY_REQUEST';
export const POST_FUELREFILL_FAILURE = 'POST_FUELREFILL_FAILURE';
export const POST_FUELREFILL_SUCCESS = 'POST_FUELREFILL_SUCCESS';

export function postFuelRefillFailure(bool) {
  return {
    type: 'POST_FUELREFILL_FAILURE',
    hasErrored: bool,
  };
}

export function postFuelRefillLoading(bool) {
  return {
    type: 'POST_FUELREFILL_REQUEST',
    isLoading: bool,
  };
}

export function postFuelRefillSuccess(fuelRefills) {
  return {
    type: 'POST_FUELREFILL_SUCCESS',
    fuelRefills,
  };
}

export function getFuelRefills() {
  return (dispatch) => {
    dispatch(postFuelRefillLoading(true));
    return axios.get(API_ADDRESS + '/api/fuelrefill/getall')
      .then((response) => {
        dispatch(postFuelRefillLoading(false));
        return response.data;
      })
      .then((fuelrefills) => {
        dispatch(postFuelRefillSuccess(fuelrefills));
      })
      .catch(() => {
        dispatch(postFuelRefillFailure(true));
      });
  };
}

export function postFuelRefill() {
  return (dispatch) => {
    dispatch(postFuelRefillLoading(true));
    return axios.post(API_ADDRESS + '/api/fuelrefill/register', {

    })
      .then((response) => {
        dispatch(postFuelRefillLoading(false));
        return response.data;
      })
      .then((fuelrefills) => {
        dispatch(postFuelRefillSuccess(fuelrefills));
      })
      .catch(() => {
        dispatch(postFuelRefillFailure(true));
      });
  };

}

export function deleteFuelRefill() {
  return (dispatch) => {
    dispatch(postFuelRefillLoading(true));
    return axios.post(API_ADDRESS + '/api/fuelrefill/remove', {
    })
      .then((response) => {
        dispatch(postFuelRefillLoading(false));
        return response.data;
      })
      .then((fuelrefills) => {
        dispatch(postFuelRefillSuccess(fuelrefills));
      })
      .catch(() => {
        dispatch(postFuelRefillFailure(true));
      });
  };
}
