

export const TRAVELLOG_FROM = 'TRAVELLOG_FROM';
export const TRAVELLOG_TO = 'TRAVELLOG_TO';
export const TRAVELLOG_DISTANCE = 'TRAVELLOG_DISTANCE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGIN_MAIL = 'LOGIN_MAIL';
export const LOGIN_ERROR_FORM_OPTIONS = 'LOGIN_ERROR_FORM_OPTIONS';
export const LOGIN_RESET_FORM_OPTIONS = 'LOGIN_RESET_FORM_OPTIONS';
export const RESET_GET_CAR = 'RESET_GET_CAR';
export const USER_LOGOUT = 'USER_LOGOUT';


export function travelLogFrom(position) {
  return {
    type: 'TRAVELLOG_FROM',
    position,
  };
}

export function travelLogTo(position) {
  return {
    type: 'TRAVELLOG_TO',
    position,
  };
}

export function travelLogDistance(distance) {
  return {
    type: 'TRAVELLOG_DISTANCE',
    distance,
  };
}
