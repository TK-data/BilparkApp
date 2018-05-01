import { POST_FUELREFILL_FAILURE, POST_FUELREFILL_REQUEST, POST_FUELREFILL_SUCCESS, REMOVE_FUELREFILL } from '../actions/fuelRefill';

const initialState = {
  hasErrored: false,
  isLoading: false,
  fuelRefills: [],
};

export default function fuelRefill(state = initialState, action) {
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
  case REMOVE_FUELREFILL:
    return {
      ...state,
      fuelRefills: state.fuelRefills.filter((item) => {
        return item.RefillID !== action.RefillID;
      }),
    };
  default:
    return state;
  }
}
