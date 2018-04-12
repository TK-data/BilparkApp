import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS } from '../actions/registerCar';

export function carFetchFailure(state = false, action) {
  switch (action.type) {
  case GET_CAR_FAILURE:
    return action.hasErrored;
  default:
    return state;
  }
}
export function carFetchLoading(state = false, action) {
  switch (action.type) {
  case GET_CAR_REQUEST:
    return action.isLoading;
  default:
    return state;
  }
}
export function carFetchSuccess(state = '', action) {
  switch (action.type) {
  case GET_CAR_SUCCESS:
    return action.car;
  default:
    return state;
  }
}
