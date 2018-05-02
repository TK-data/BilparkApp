import { SET_FUELREFILL_FORM_DATE, SET_FUELREFILL_FORM_LITERS, SET_FUELREFILL_FORM_PRICE, RESET_FUELREFILL_FORM } from '../actions/fuelRefillForm';

const initialState = {
  date: new Date(),
  liters: '0',
  price: '0',
};

export default function fuelRefillForm(state = initialState, action) {
  switch (action.type) {
  case SET_FUELREFILL_FORM_DATE:
    return {
      ...state,
      date: action.date,
    };
  case SET_FUELREFILL_FORM_LITERS:
    return {
      ...state,
      liters: action.liters,
    };
  case SET_FUELREFILL_FORM_PRICE:
    return {
      ...state,
      price: action.price,
    };
  case RESET_FUELREFILL_FORM:
    return {
      initialState,
    };
  case 'LOGOUT_SUCCESS':
    return {
      initialState,
    };
  default:
    return state;
  }
}
