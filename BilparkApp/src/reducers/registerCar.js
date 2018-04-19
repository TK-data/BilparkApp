import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_DECLINE, GET_CAR_ACCEPT } from '../actions/registerCar';

export const initialState = {
  hasErrored: false,
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
      hasErrored: false,
      isLoading: action.isLoading,
      car: '',
      isAccepted: false,
    };
  case GET_CAR_SUCCESS:
    return {
      hasErrored: false,
      isLoading: false,
      car: action.car,
      isAccepted: false,
    };
  case GET_CAR_ACCEPT:
    return {
      hasErrored: false,
      isLoading: false,
      car: state.car,
      isAccepted: action.isAccepted,
    };
  case GET_CAR_DECLINE:
    return {
      hasErrored: false,
      isLoading: false,
      car: '',
      isAccepted: false,
    };
  default:
    return state;
  }
}

