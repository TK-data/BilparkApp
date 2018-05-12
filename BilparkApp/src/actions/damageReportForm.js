import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

export const POST_DAMAGEREPORT_REQUEST = 'POST_DAMAGEREPORT_REQUEST';
export const POST_DAMAGEREPORT_FAILURE = 'POST_DAMAGEREPORT_FAILURE';
export const POST_DAMAGEREPORT_SUCCESS = 'POST_DAMAGEREPORT_SUCCESS';
export const REGISTER_DAMAGEREPORT = 'REGISTER_DAMAGEREPORT';
export const GET_CURRENT_DAMAGEREPORT = 'GET_CURRENT_DAMAGEREPORT';
export const DAMAGE_REPORT_VALUES = 'DAMAGE_REPORT_VALUES';
export const NO_DAMAGE_REPORT_VALUES = 'NO_DAMAGE_REPORT_VALUES';

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

export function getCurrentDamageReportSuccess(damagereport) {
  return {
    type: 'GET_CURRENT_DAMAGEREPORT',
    currentDamageReport: damagereport,
  };
}

export function damageReportValues(values) {
  return {
    type: 'DAMAGE_REPORT_VALUES',
    currentDamageReportValues: values,
  };
}

export function noDamageReportValues() {
  return {
    type: 'NO_DAMAGE_REPORT_VALUES',
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

export function getCurrentDamageReport() {
  return (dispatch) => {
    dispatch(postDamageReportLoading(true));
    return axios.get(API_ADDRESS + '/api/damagereport/getcurrent')
      .then((response) => {
        dispatch(postDamageReportLoading(false));
        return response.data;
      })
      .then((userdamagereport) => {
        dispatch(getCurrentDamageReportSuccess(userdamagereport));
        dispatch(damageReportValues(userdamagereport.Items));
      })
      .catch((err) => {
        if (err.response.status === 404) {
          dispatch(postDamageReportLoading(false));
          dispatch(noDamageReportValues());
          return;
        }
        dispatch(postDamageReportFailure(true));
      });
  };
}

export function postDamageReport(Items) {
  const params = {
    Items,
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
        dispatch(damageReportValues(userdamagereport.items));
      })
      .catch(() => {
        dispatch(postDamageReportFailure(true));
      });
  };
}
