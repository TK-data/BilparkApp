import { ONCHANGE_COMPANY, REGISTER_COMPANY_REQUEST, REGISTER_COMPANY_COMPLETE, REGISTER_COMPANY_FAILURE, GET_COMPANIES_REQUEST, GET_COMPANIES_COMPLETE, GET_COMPANIES_FAILURE } from '../actions/registerCompany';


export const initialCompanySaveState = {
  hasErrored: false,
  isLoading: false,
  company: '',
  companies: [],
  selectedCompany: '',
};

export function registerCompany(state = initialCompanySaveState, action) {
  switch (action.type) {
  case REGISTER_COMPANY_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case REGISTER_COMPANY_COMPLETE:
    return {
      ...state,
      company: action.company,
    };
  case REGISTER_COMPANY_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    };
  case GET_COMPANIES_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
    };
  case GET_COMPANIES_COMPLETE:
    return {
      ...state,
      companies: action.companies,
    };
  case GET_COMPANIES_FAILURE:
    return {
      ...state,
      hasErrored: action.hasErrored,
    };
  case ONCHANGE_COMPANY:
    return {
      ...state,
      selectedCompany: action.selectedCompany,
    };
  default:
    return state;
  }
}
