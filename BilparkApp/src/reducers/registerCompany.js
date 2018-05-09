import { REGISTER_COMPANY_REQUEST, REGISTER_COMPANY_COMPLETE, REGISTER_COMPANY_FAILURE } from '../actions/registerCompany';


export const initialCompanySaveState = {
  hasErrored: false,
  isLoading: false,
  company: '',
};

export function saveCompany(state = initialCompanySaveState, action) {
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
  default:
    return state;
  }
}
