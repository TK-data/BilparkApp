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

});
