import t from 'tcomb-form-native';

import {
  TRAVELLOG_FROM,
  TRAVELLOG_TO,
  TRAVELLOG_DISTANCE,
  TRAVELLOG_DATEPICKER_VISIBLE,
  TRAVELLOG_DATEPICKER_DATE,
  TRAVELLOG_FORM_TYPE,
  TRAVELLOG_FORM_VALUE,
  TRAVELLOG_CARGO,
  TRAVELLOG_CORDINATES,
  TRAVELLOG_TO_ADDRESS,
  TRAVELLOG_FROM_ADDRESS,
  POST_TRAVELLOG_LOADING,
  POST_TRAVELLOG_SUCCESS,
  TRAVELLOG_RESET_STATE,
} from '../actions/travelLog';

const Passengers = t.enums({
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
});

const Passenger = t.struct({
  Passenger: Passengers,
});

const date = new Date();

const init = {
  positionFrom: '0',
  positionTo: '0',
  addressFrom: '',
  addressTo: '',
  distance: '0km',
  datepickerVisible: false,
  datepickerDate: (date.getDate() + '.' + (date.getMonth() + 1) + '.' + (date.getFullYear())),
  formType: Passenger,
  formValue: {
    Passenger: '0',
    Passenger1: '',
    Passenger2: '',
    Passenger3: '',
    Passenger4: '',
    Passenger5: '',
  },
  cargoValue: {
    Cargo: false,
    Comment: '',
  },
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
  case TRAVELLOG_FROM_ADDRESS:
    return {
      ...state,
      addressFrom: action.addressFrom,
    };
  case TRAVELLOG_TO_ADDRESS:
    return {
      ...state,
      addressTo: action.addressTo,
    };
  case TRAVELLOG_CORDINATES:
    return {
      ...state,
      cordinates: action.cordinates,
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
  case TRAVELLOG_FORM_TYPE:
    return {
      ...state,
      formType: action.formType,
    };
  case TRAVELLOG_FORM_VALUE:
    return {
      ...state,
      formValue: action.value,
    };
  case TRAVELLOG_CARGO:
    return {
      ...state,
      cargoValue: action.cargoValue,
    };
  case POST_TRAVELLOG_LOADING:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case POST_TRAVELLOG_SUCCESS:
    return {
      ...state,
      success: action.success,
    };
  case TRAVELLOG_RESET_STATE:
    return init;
  default:
    return state;
  }

}
