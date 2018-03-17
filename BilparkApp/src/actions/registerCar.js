const axios = require('axios');

export const GET_CAR_REQUEST = 'GET_CAR_REQUEST';
export const GET_CAR_SUCCESS = 'GET_CAR_SUCCESS';
export const GET_CAR_FAILURE = 'GET_CAR_FAILURE';

export function carFetchFailure(bool) {
  console.log('fail');
  return {
    type: 'GET_CAR_FAILURE',
    hasErrored: bool,
  };
}
export function carFetchLoading(bool) {
  return {
    type: 'GET_CAR_REQUEST',
    isLoading: bool,
  };
}
export function carFetchSuccess(car) {
  return {
    type: 'GET_CAR_SUCCESS',
    car,
  };
}

export function getCar(nr) {
  return (dispatch) => {
    dispatch(carFetchLoading(true));

    axios.post('https://localhost:1337/api/dsm', {
      regnr: nr,
    })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        dispatch(carFetchLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(car => dispatch(carFetchSuccess(car)))
      .catch(() => dispatch(carFetchFailure(true)));
  };
}
