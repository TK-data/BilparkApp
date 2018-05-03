import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const POST_FUELREFILL_REQUEST = 'POST_FUELREFILL_REQUEST';
export const POST_FUELREFILL_FAILURE = 'POST_FUELREFILL_FAILURE';
export const POST_FUELREFILL_SUCCESS = 'POST_FUELREFILL_SUCCESS';
export const REMOVE_FUELREFILL = 'REMOVE_FUELREFILL';
export const REGISTER_FUELREFILL = 'REGISTER_FUELREFILL';

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

export function removeFuelRefill(RefillID) {
  return {
    type: 'REMOVE_FUELREFILL',
    RefillID,
  };
}

export function registerFuelRefill(RefillItem) {
  return {
    type: 'REGISTER_FUELREFILL',
    RefillItem,
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

export function postFuelRefill(FuelTime) {
  const params = {
  };

  if (FuelTime !== undefined) {
    params.FuelTime = FuelTime;
  }
  return (dispatch) => {
    dispatch(postFuelRefillLoading(true));
    return axios.post(API_ADDRESS + '/api/fuelrefill/register', params)
      .then((response) => {
        dispatch(postFuelRefillLoading(false));
        return response.data;
      })
      .then((fuelrefill) => {
        dispatch(registerFuelRefill(fuelrefill));
      })
      .catch(() => {
        dispatch(postFuelRefillFailure(true));
      });
  };

}

export function deleteFuelRefill(RefillID) {
  return (dispatch) => {
    dispatch(postFuelRefillLoading(true));
    return axios.post(API_ADDRESS + '/api/fuelrefill/remove', {
      RefillID,
    })
      .then((response) => {
        dispatch(postFuelRefillLoading(false));
        return response.data;
      })
      .then(() => {
        dispatch(removeFuelRefill(RefillID));
      })
      .catch(() => {
        dispatch(postFuelRefillFailure(true));
      });
  };
}
