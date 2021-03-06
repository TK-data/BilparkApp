import { SET_FUELREFILL_FORM_DATE, SET_FUELREFILL_FORM_RATE, SET_FUELREFILL_FORM_PRICE, RESET_FUELREFILL_FORM } from '../actions/fuelRefillForm';

const initialState = {
  date: new Date(),
  rate: '',
  price: '',
};

export default function fuelRefillForm(state = initialState, action) {
  switch (action.type) {
  case SET_FUELREFILL_FORM_DATE:
    return {
      ...state,
      date: action.date,
    };
  case SET_FUELREFILL_FORM_RATE:
    return {
      ...state,
      rate: action.rate,
    };
  case SET_FUELREFILL_FORM_PRICE:
    return {
      ...state,
      price: action.price,
    };
  case RESET_FUELREFILL_FORM:
    return initialState;
  case 'LOGOUT_SUCCESS':
    return initialState;
  default:
    return state;
  }
}
