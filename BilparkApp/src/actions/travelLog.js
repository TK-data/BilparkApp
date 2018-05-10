export const TRAVELLOG_FROM = 'TRAVELLOG_FROM';
export const TRAVELLOG_TO = 'TRAVELLOG_TO';
export const TRAVELLOG_DISTANCE = 'TRAVELLOG_DISTANCE';
export const TRAVELLOG_DATEPICKER_VISIBLE = 'TRAVELLOG_DATEPICKER_VISIBLE';
export const TRAVELLOG_DATEPICKER_DATE = 'TRAVELLOG_DATEPICKER_DATE';
export const TRAVELLOG_FORM_VALUE = 'TRAVELLOG_FORM_VALUE';
export const TRAVELLOG_FORM_TYPE = 'TRAVELLOG_FORM_TYPE';
export const TRAVELLOG_CARGO = 'TRAVELLOG_CARGO';
export const TRAVELLOG_CORDINATES = 'TRAVELLOG_CORDINATES';


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
