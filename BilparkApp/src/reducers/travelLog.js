import { TRAVELLOG_FROM, TRAVELLOG_TO, TRAVELLOG_DISTANCE } from '../actions/travelLog';

const init = {
  positionFrom: '123',
  positionTo: '456',
  distance: '21km',
};

export default function travelLog(state = init, action) {
  switch (action.type) {
  case TRAVELLOG_FROM:
    return {
      ...state,
      positionFrom: action.positionFrom,
    };
  case TRAVELLOG_TO:
    return {
      ...state,
      positionTo: action.positionTo,
    };
  case TRAVELLOG_DISTANCE:
    return {
      ...state,
      distance: action.distance,
    };
  default:
    return state;
  }

}
