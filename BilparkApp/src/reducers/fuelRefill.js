import { POST_FUELREFILL_FAILURE, POST_FUELREFILL_REQUEST, POST_FUELREFILL_SUCCESS } from '../actions/fuelRefill';

const initialState = {
  hasErrored: false,
  isLoading: false,
  fuelRefills: [],
};

export default function fuelRefills(state = initialState, action) {
  switch (action.type) {
  case POST_FUELREFILL_FAILURE:
    return {
      ...state,
      hasErrored: true,
    };
  case POST_FUELREFILL_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case POST_FUELREFILL_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      fuelRefills: action.fuelRefills,
    };
  default:
    return state;
  }
}
