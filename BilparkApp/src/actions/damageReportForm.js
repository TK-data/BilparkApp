import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const POST_DAMAGEREPORT_REQUEST = 'POST_DAMAGEREPORT_REQUEST';
export const POST_DAMAGEREPORT_FAILURE = 'POST_DAMAGEREPORT_FAILURE';
export const POST_DAMAGEREPORT_SUCCESS = 'POST_DAMAGEREPORT_SUCCESS';
export const REGISTER_DAMAGEREPORT = 'REGISTER_DAMAGEREPORT';

export function postDamageReportFailure(bool) {
  return {
    type: 'POST_DAMAGEREPORT_FAILURE',
    hasErrored: bool,
  };
}
export function postDamageReportLoading(bool) {
  return {
    type: 'POST_DAMAGEREPORT_REQUEST',
    isLoading: bool,
  };
}
export function postDamageReportSuccess(user) {
  return {
    type: 'UPDATE_USER',
    isLoggedIn: true,
    user,
  };
}

export function registerDamageReport(damagereport) {
  return {
    type: 'REGISTER_DAMAGEREPORT',
    damagereport,
  };
}

export function getDamageReport() {
  return (dispatch) => {
    dispatch(postDamageReportLoading(true));
    return axios.get(API_ADDRESS + '/api/damagereport/getall')
      .then((response) => {
        dispatch(postDamageReportLoading(false));
        return response.data;
      })
      .then((userdamagereport) => {
        dispatch(postDamageReportSuccess(userdamagereport));
      })
      .catch(() => {
        dispatch(postDamageReportFailure(true));
      });
  };
}

export function postDamageReport(damagereport, description) {
  const params = {
    damagereport,
    description,
  };
  return (dispatch) => {
    dispatch(postDamageReportLoading(true));
    return axios.post(API_ADDRESS + '/api/damagereport/register', params)
      .then((response) => {
        dispatch(postDamageReportLoading(false));
        return response.data;
      })
      .then((userdamagereport) => {
        dispatch(registerDamageReport(userdamagereport));
      })
      .catch(() => {
        dispatch(postDamageReportFailure(true));
      });
  };

}
