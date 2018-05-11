import { POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE, POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT } from '../actions/damageReportForm';

const initialState = {
  hasErrored: false,
  isLoading: false,
  damageReports: [],
};

export default function damageReportForm(state = initialState, action) {
  switch (action.type) {
  case POST_DAMAGEREPORT_FAILURE:
    return {
      ...state,
      hasErrored: true,
    };
  case POST_DAMAGEREPORT_REQUEST:
    return {
      ...state,
      isLoading: action.isLoading,
      hasErrored: false,
    };
  case POST_DAMAGEREPORT_SUCCESS:
    return {
      ...state,
      hasErrored: false,
      damageReports: action.damageReport,
    };
  case REGISTER_DAMAGEREPORT:
    return {
      ...state,
      hasErrored: false,
      damageReport: state.damageReport,
    };
  case GET_CURRENT_DAMAGEREPORT:
    return {
      ...state,
      hasErrored: false,
      currentDamageReport: state.currentDamageReport,
    };
  case 'LOGOUT_SUCCESS':
    return initialState;
  default:
    return state;
  }
}
