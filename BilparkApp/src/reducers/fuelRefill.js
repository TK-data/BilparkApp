import { POST_FUELREFILL_FAILURE, POST_FUELREFILL_REQUEST, POST_FUELREFILL_SUCCESS, REMOVE_FUELREFILL, REGISTER_FUELREFILL } from '../actions/fuelRefill';

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
      hasErrored: false,
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
      hasErrored: false,
    };
  case REGISTER_FUELREFILL:
    return {
      ...state,
      hasErrored: false,
      fuelRefills: state.fuelRefills.concat(action.RefillItem),
    };
  default:
    return state;
  }
}
