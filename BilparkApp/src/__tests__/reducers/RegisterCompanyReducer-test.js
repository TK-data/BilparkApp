import {
  ONCHANGE_COMPANY,
  REGISTER_COMPANY_REQUEST,
  REGISTER_COMPANY_COMPLETE,
  REGISTER_COMPANY_FAILURE,
  GET_COMPANIES_REQUEST,
  GET_COMPANIES_COMPLETE,
  GET_COMPANIES_FAILURE } from '../../actions/registerCompany';

import { registerCompany, initialCompanySaveState } from '../../reducers/registerCompany';

describe('registerCompany reducer tests', () => {
  it('Should handle REGISTER_COMPANY_FAILURE', () => {
    expect(registerCompany(initialCompanySaveState, {
      type: REGISTER_COMPANY_FAILURE,
      hasErrored: true,
    })).toEqual({
      hasErrored: true,
      isLoading: false,
      company: '',
      companies: [],
      selectedCompany: '',
    });
  });

  it('Should handle REGISTER_COMPANY_REQUEST', () => {
    expect(registerCompany(initialCompanySaveState, {
      type: REGISTER_COMPANY_REQUEST,
      isLoading: true,
    })).toEqual({
      hasErrored: false,
      isLoading: true,
      company: '',
      companies: [],
      selectedCompany: '',
    });
  });

  it('Should handle REGISTER_COMPANY_COMPLETE', () => {
    const company = {
      CompanyID: 5,
      CompanyName: 'Bedrift1',
    };

    expect(registerCompany(initialCompanySaveState, {
      type: REGISTER_COMPANY_COMPLETE,
      company,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      company,
      companies: [],
      selectedCompany: '',
    });
  });

  it('Should handle GET_COMPANIES_FAILURE', () => {
    expect(registerCompany(initialCompanySaveState, {
      type: GET_COMPANIES_FAILURE,
      hasErrored: true,
    })).toEqual({
      hasErrored: true,
      isLoading: false,
      company: '',
      companies: [],
      selectedCompany: '',
    });
  });

  it('Should handle GET_COMPANIES_REQUEST', () => {
    expect(registerCompany(initialCompanySaveState, {
      type: GET_COMPANIES_REQUEST,
      isLoading: true,
    })).toEqual({
      hasErrored: false,
      isLoading: true,
      company: '',
      companies: [],
      selectedCompany: '',
    });
  });

  it('Should handle GET_COMPANIES_COMPLETE', () => {

    const companies = [
      {
        CompanyID: 5,
        CompanyName: 'Bedrift1',
      },
      {
        CompanyID: 8,
        CompanyName: 'Bedrift2',
      },
    ];

    expect(registerCompany(initialCompanySaveState, {
      type: GET_COMPANIES_COMPLETE,
      companies,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      company: '',
      companies,
      selectedCompany: '',
    });
  });

  it('Should handle ONCHANGE_COMPANY', () => {
    const selectedCompany = 5;

    expect(registerCompany(initialCompanySaveState, {
      type: ONCHANGE_COMPANY,
      selectedCompany,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      company: '',
      companies: [],
      selectedCompany,
    });
  });

  it('Should properly set default state', () => {

    expect(registerCompany(initialCompanySaveState, {})).toEqual({
      hasErrored: false,
      isLoading: false,
      company: '',
      companies: [],
      selectedCompany: '',
    });
  });


});
