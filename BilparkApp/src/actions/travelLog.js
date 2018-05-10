export const TRAVELLOG_FROM = 'TRAVELLOG_FROM';
export const TRAVELLOG_TO = 'TRAVELLOG_TO';
export const TRAVELLOG_DISTANCE = 'TRAVELLOG_DISTANCE';
export const TRAVELLOG_DATEPICKER_VISIBLE = 'TRAVELLOG_DATEPICKER_VISIBLE';
export const TRAVELLOG_DATEPICKER_DATE = 'TRAVELLOG_DATEPICKER_DATE';
// export const TRAVELLOG_DATEPICKER_DATE = 'TRAVELLOG_DATEPICKER_DATE';
// export const TRAVELLOG_DATEPICKER_DATE = 'TRAVELLOG_DATEPICKER_DATE';


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
