import { SHOW_FUELDAY_MODAL, SHOW_FUELREFILL_MODAL, HIDE_MODAL } from '../actions/fuelDay';

const init = {
  fuelRefill: false,
  fuelDay: false,
};

function modals(state = init, action) {
  switch (action.type) {
  case SHOW_FUELDAY_MODAL:
    return {
      ...state,
      fuelDay: true,
    };
  case SHOW_FUELREFILL_MODAL:
    return {
      ...state,
      fuelRefill: true,
    };
  case HIDE_MODAL:
    return init;
  default:
    return state;
  }

}

export default modals;
