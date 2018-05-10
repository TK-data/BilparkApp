import { TRAVELLOG_FROM, TRAVELLOG_TO, TRAVELLOG_DISTANCE, TRAVELLOG_DATEPICKER_VISIBLE, TRAVELLOG_DATEPICKER_DATE } from '../actions/travelLog';

const init = {
  positionFrom: '123',
  positionTo: '456',
  distance: '0km',
  datepickerVisible: false,
  datepickerDate: 'Velg dato',
};

export default function travelLog(state = init, action) {
  switch (action.type) {
  case TRAVELLOG_FROM:
    return {
      ...state,
      positionFrom: action.positionFrom,
    };
  case TRAVELLOG_TO:
    return {
      ...state,
      positionTo: action.positionTo,
    };
  case TRAVELLOG_DISTANCE:
    return {
      ...state,
      distance: action.distance,
    };
  case TRAVELLOG_DATEPICKER_VISIBLE:
    return {
      ...state,
      datepickerVisible: action.bool,
    };
  case TRAVELLOG_DATEPICKER_DATE:
    return {
      ...state,
      datepickerDate: action.date,
    };
  default:
    return state;
  }

}
