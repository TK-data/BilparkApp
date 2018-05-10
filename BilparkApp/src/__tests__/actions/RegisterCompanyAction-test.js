import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { registerCompanyRequest,
  registerCompanyComplete,
  registerCompanyFailure,
  saveCompany,
  getCompanies,
  getCompaniesError,
  getCompaniesRequest,
  getCompaniesComplete,
  routeToMenu,
  selectCompany,
  ONCHANGE_COMPANY,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_COMPLETE,
  REGISTER_COMPANY_FAILURE,
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_COMPLETE,
  GET_COMPANIES_FAILURE }
  from '../../actions/registerCompany';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Register company actions', () => {
  it('Should create an action when company fetch fails', () => {
    const expectedAction = {
      type: GET_COMPANIES_FAILURE,
      hasErrored: true,
    };
    expect(getCompaniesError(true)).toEqual(expectedAction);
  });

  it('Should create an action when company fetch is loading', () => {
    const expectedAction = {
      type: GET_COMPANIES_REQUEST,
      isLoading: true,
    };
    expect(getCompaniesRequest(true)).toEqual(expectedAction);
  });

  it('Should create an action when companies are fetched, and update them', () => {
    const companies = [
      { CompanyID: 5, CompanyName: 'Bedrift1' },
      { CompanyID: 9, CompanyName: 'Bedrift2' },
    ];
    const expectedAction = {
      type: GET_COMPANIES_COMPLETE,
      companies,
    };
    expect(getCompaniesComplete(companies)).toEqual(expectedAction);
  });

  it('Should create an action when', () => {
    const expectedAction = {
    };
    expect().toEqual(expectedAction);
  });

});
