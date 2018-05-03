import { SHOW_MODAL, HIDE_MODAL } from '../actions/fuelDay';

function modals(state = {
  isShowing: false,
}, action) {
  switch (action.type) {
  case SHOW_MODAL:
    return {
      isShowing: true,
    };
  case HIDE_MODAL:
    return {
      isShowing: false,
    };
  default:
    return state;
  }

}

export default modals;
