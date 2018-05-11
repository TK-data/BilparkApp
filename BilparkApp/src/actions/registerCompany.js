import { API_ADDRESS } from '../config/connections';

const axios = require('axios');

/* Save company for user */

export const REGISTER_COMPANY_REQUEST = 'REGISTER_COMPANY_REQUEST';
export const REGISTER_COMPANY_COMPLETE = 'REGISTER_COMPANY_COMPLETE';
export const REGISTER_COMPANY_FAILURE = 'REGISTER_COMPANY_FAILURE';

export function registerCompanyRequest(boolean) {
  return {
    type: REGISTER_COMPANY_REQUEST,
    isLoading: boolean,
  };
}

export function registerCompanyComplete(company) {
  return {
    type: REGISTER_COMPANY_COMPLETE,
    company,
  };
}

export function registerCompanyFailure(boolean) {
  return {
    type: REGISTER_COMPANY_FAILURE,
    hasErrored: boolean,
  };
}

export function saveCompany(CompanyID) {
  return (dispatch) => {
    dispatch(registerCompanyRequest(true));

    return axios.post(API_ADDRESS + '/api/company/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      CompanyID,
    })
      .then((response) => {
        dispatch(registerCompanyRequest(false));
        return response.data;
      })
      .then((company) => {
        dispatch(registerCompanyComplete(company));
        dispatch(routeToMenu());
      })
      .catch(() => {
        dispatch(registerCompanyFailure(true));
      });
  };
}


/* Get all companies */

export const GET_COMPANIES_REQUEST = 'GET_COMPANIES_REQUEST';
export const GET_COMPANIES_COMPLETE = 'GET_COMPANIES_COMPLETE';
export const GET_COMPANIES_FAILURE = 'GET_COMPANIES_FAILURE';

export function getCompaniesRequest(isLoading) {
  return {
    type: GET_COMPANIES_REQUEST,
    isLoading,
  };
}

export function getCompaniesComplete(companies) {
  return {
    type: GET_COMPANIES_COMPLETE,
    companies,
  };
}

export function getCompaniesError(hasErrored) {
  return {
    type: GET_COMPANIES_FAILURE,
    hasErrored,
  };
}

export function routeToMenu() {
  return {
    type: 'LOGIN_SUCCESS',
  };
}

export function getCompanies() {
  return (dispatch) => {
    dispatch(getCompaniesRequest(true));
    dispatch(getCompaniesError(false));

    return axios.get(API_ADDRESS + '/api/Company')
      .then((response) => {
        dispatch(getCompaniesRequest(false));
        dispatch(getCompaniesComplete(response.data));
      })
      .catch((err) => {
        dispatch(getCompaniesError(true));
      });
  };
}

export const ONCHANGE_COMPANY = 'ONCHANGE_COMPANY';

export function selectCompany(selectedCompany) {
  return {
    type: ONCHANGE_COMPANY,
    selectedCompany,
  };
}
