import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_DECLINE,
  GET_CAR_ACCEPT, GET_CAR_SAVE_FAILURE, GET_CAR_FORM_VALUE, RESET_GET_CAR } from '../actions/registerCar';

export const initialState = {
  hasErrored: '',
  isLoading: false,
  car: '',
  isAccepted: false,
};

export function carFetch(state = initialState, action) {
  switch (action.type) {
  case GET_CAR_FAILURE:
    return {
      hasErrored: action.hasErrored,
      isLoading: false,
      car: '',
      isAccepted: false,
    };
  case GET_CAR_REQUEST:
    return {
      hasErrored: '',
      isLoading: action.isLoading,
      car: '',
      isAccepted: false,
    };
  case GET_CAR_SUCCESS:
    return {
      hasErrored: '',
      isLoading: false,
      car: action.car,
      isAccepted: false,
    };
  case GET_CAR_ACCEPT:
    return {
      hasErrored: '',
      isLoading: false,
      car: state.car,
      isAccepted: action.isAccepted,
    };
  case GET_CAR_DECLINE:
    return {
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    };
  case GET_CAR_SAVE_FAILURE:
    return {
      hasErrored: action.hasErrored,
      isLoading: false,
      car: '',
      isAccepted: false,
    };
  case RESET_GET_CAR:
    return {
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    };
  default:
    return state;
  }
}

export function carForm(state = {}, action) {
  switch (action.type) {
  case GET_CAR_FORM_VALUE:
    return action.carFormValue;
  default:
    return state;
  }
}
