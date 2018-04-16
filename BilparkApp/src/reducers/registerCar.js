import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_DECLINE } from '../actions/registerCar';

export const initialState = {
  hasErrored: false,
  isLoading: false,
  car: '',
};

export function carFetch(state = initialState, action) {
  switch (action.type) {
  case GET_CAR_FAILURE:
    return {
      hasErrored: action.hasErrored,
      isLoading: false,
      car: '',
    };
  case GET_CAR_REQUEST:
    return {
      hasErrored: false,
      isLoading: action.isLoading,
      car: '',
    };
  case GET_CAR_SUCCESS:
    return {
      hasErrored: false,
      isLoading: false,
      car: action.car,
    };
  case GET_CAR_DECLINE:
    return initialState;
  default:
    return state;
  }
}

