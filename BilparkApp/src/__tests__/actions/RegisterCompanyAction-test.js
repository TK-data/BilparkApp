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

describe('Get and register company actions', () => {
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


});

describe('Register and get car async actions', () => {
  let axiosMock = new MockAdapter(axios);

  afterEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  it('Creates a REGISTER_COMPANY_COMPLETE action when registering is successful', () => {

    const company = {
      CompanyID: 5,
      CompanyName: 'Bedrift1',
    };

    axiosMock.onPost().reply(200, company);

    const expectedActions = [
      {
        type: REGISTER_COMPANY_REQUEST,
        isLoading: true,
      },
      {
        type: REGISTER_COMPANY_REQUEST,
        isLoading: false,
      },
      {
        type: REGISTER_COMPANY_COMPLETE,
        company,
      },
      {
        type: 'LOGIN_SUCCESS',
      },
    ];

    const store = mockStore({});

    return store.dispatch(saveCompany(5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates a REGISTER_COMPANY_FAILURE action when registering is unsuccessful', () => {

    axiosMock.onPost().reply(404);

    const expectedActions = [
      {
        type: REGISTER_COMPANY_REQUEST,
        isLoading: true,
      },
      {
        type: REGISTER_COMPANY_FAILURE,
        hasErrored: true,
      },
    ];

    const store = mockStore({});

    return store.dispatch(saveCompany(5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates a GET_COMPANY_COMPLETE action when get request is successful', () => {

    const companies = [
      {
        CompanyID: 5,
        CompanyName: 'Bedrift1',
      },
      {
        CompanyID: 9,
        CompanyName: 'Bedrift2',
      },
    ];

    axiosMock.onGet().reply(200, companies);

    const expectedActions = [
      {
        type: GET_COMPANIES_REQUEST,
        isLoading: true,
      },
      {
        type: GET_COMPANIES_FAILURE,
        hasErrored: false,
      },
      {
        type: GET_COMPANIES_REQUEST,
        isLoading: false,
      },
      {
        type: GET_COMPANIES_COMPLETE,
        companies,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getCompanies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates a GET_COMPANY_FAILURE action when get request is unsuccessful', () => {

    axiosMock.onGet().reply(404);

    const expectedActions = [
      {
        type: GET_COMPANIES_REQUEST,
        isLoading: true,
      },
      {
        type: GET_COMPANIES_FAILURE,
        hasErrored: false,
      },
      {
        type: GET_COMPANIES_FAILURE,
        hasErrored: true,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getCompanies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
