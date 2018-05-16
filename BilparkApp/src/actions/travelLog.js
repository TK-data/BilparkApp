import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const TRAVELLOG_FROM = 'TRAVELLOG_FROM';
export const TRAVELLOG_TO = 'TRAVELLOG_TO';
export const TRAVELLOG_DISTANCE = 'TRAVELLOG_DISTANCE';
export const TRAVELLOG_DATEPICKER_VISIBLE = 'TRAVELLOG_DATEPICKER_VISIBLE';
export const TRAVELLOG_DATEPICKER_DATE = 'TRAVELLOG_DATEPICKER_DATE';
export const TRAVELLOG_FORM_VALUE = 'TRAVELLOG_FORM_VALUE';
export const TRAVELLOG_FORM_TYPE = 'TRAVELLOG_FORM_TYPE';
export const TRAVELLOG_CARGO = 'TRAVELLOG_CARGO';
export const TRAVELLOG_CORDINATES = 'TRAVELLOG_CORDINATES';
export const TRAVELLOG_FROM_ADDRESS = 'TRAVELLOG_FROM_ADDRESS';
export const TRAVELLOG_TO_ADDRESS = 'TRAVELLOG_TO_ADDRESS';
export const POST_TRAVELLOG_LOADING = 'POST_TRAVELLOG_LOADING';
export const POST_TRAVELLOG_SUCCESS = 'POST_TRAVELLOG_SUCCESS';
export const POST_TRAVELLOG_FAILURE = 'POST_TRAVELLOG_FAILURE';

export function travelLogFrom(positionFrom) {
  return {
    type: TRAVELLOG_FROM,
    positionFrom,
  };
}

export function travelLogTo(positionTo) {
  return {
    type: TRAVELLOG_TO,
    positionTo,
  };
}

export function travelLogFromAddress(addressFrom) {
  return {
    type: TRAVELLOG_FROM_ADDRESS,
    addressFrom,
  };
}

export function travelLogToAddress(addressTo) {
  return {
    type: TRAVELLOG_TO_ADDRESS,
    addressTo,
  };
}

export function travleLogCordinates(cordinates) {
  return {
    type: TRAVELLOG_CORDINATES,
    cordinates,
  };
}

export function travelLogDistance(distance) {
  return {
    type: TRAVELLOG_DISTANCE,
    distance,
  };
}

export function travelLogDatepickerVisible(bool) {
  return {
    type: TRAVELLOG_DATEPICKER_VISIBLE,
    bool,
  };
}

export function travelLogDatepickerDate(date) {
  return {
    type: TRAVELLOG_DATEPICKER_DATE,
    date,
  };
}

export function travelLogSaveDate(date) {
  return (dispatch) => {
    dispatch(travelLogDatepickerDate(date));
    dispatch(travelLogDatepickerVisible(false));
  };
}

export function travelLogFormValue(value) {
  return {
    type: TRAVELLOG_FORM_VALUE,
    value,
  };
}

export function travelLogFormType(formType) {
  return {
    type: TRAVELLOG_FORM_TYPE,
    formType,
  };
}

export function travelLogCargo(cargoValue) {
  return {
    type: TRAVELLOG_CARGO,
    cargoValue,
  };
}

export function calculateDistance(cordinates) {
  const distance = require('../../node_modules/react-native-google-matrix/index.js');

  return (dispatch) => {
    distance.get(
      cordinates,
      (err, data) => {
        if (err) return console.log(err);
        dispatch(travelLogDistance(data.distance));
      },
    );
  };
}

export function postTravelLogLoading(bool) {
  return {
    type: POST_TRAVELLOG_LOADING,
    isLoading: bool,
  };
}

export function postTravelLogSuccess(bool) {
  return {
    type: POST_TRAVELLOG_SUCCESS,
    success: bool,
  };
}

export function postTravelLogFailure(bool) {
  return {
    type: POST_TRAVELLOG_FAILURE,
    hasErrored: bool,
  };
}

export function successAfterHalfSecond() {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(postTravelLogSuccess(true));
      setTimeout(() => {
        dispatch(postTravelLogSuccess(false));
      }, 500);
    }, 200);
  };
}

export function resetComponent() {
  return (dispatch) => {
    dispatch(postTravelLogLoading(true));
    setTimeout(() => {
      dispatch(postTravelLogLoading(false));
    }, 200);
  };
}

export function postTravelLog(value) {

  let Passengers = '';

  for (let x = 1; x <= parseInt(value.formValue.Passenger, 10); x += 1) {
    const name = ('Passenger' + x);
    if (x < parseInt(value.formValue.Passenger, 10)) {
      Passengers += (value.formValue[name] + ',');
    } else {
      Passengers += value.formValue[name];
    }
  }

  return (dispatch) => {
    // dispatch(postTravelLogLoading(true));
    return axios.post(API_ADDRESS + '/api/drivinglog/save', {
      drivingLog: {
        Km: parseInt(value.distance, 10),
        LocationFrom: value.addressFrom,
        LocationTo: value.addressTo,
        Date: value.datepickerDate,
        Cargo: value.cargoValue.Cargo,
        NoOfPassengers: parseInt(value.formValue.Passenger, 10),
        PassengerNames: Passengers,
        Objective: value.cargoValue.Comment,
      } })
      .then((response) => {
        dispatch(successAfterHalfSecond());
        return response.data;
      })
      .then(() => {
        dispatch(postTravelLogSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(postTravelLogFailure(true));
      });
  };
}
