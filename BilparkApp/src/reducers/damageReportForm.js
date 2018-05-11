import { POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE, POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT, DAMAGE_REPORT_VALUES } from '../actions/damageReportForm';

const initialState = {
  hasErrored: false,
  isLoading: false,
  damageReports: [],
  currentDamageReport: {},
};

const initialValue = {
  KarosseriVenstre: true,
  KarosseriVenstreBeskrivelse: 'Initial',
  KarosseriHøyre: false,
  KarosseriHøyreBeskrivelse: '',
  StøtfangerFront: false,
  StøtfangerFrontBeskrivelse: '',
  StøtfangerBak: false,
  StøtfangerBakBeskrivelse: '',
  LysUtvendig: false,
  LysUtvendigBeskrivelse: '',
  Glass: false,
  GlassBeskrivelse: '',
  FelgHjul: false,
  FelgHjulBeskrivelse: '',
};

export function damageReportValues(state = initialValue, action) {
  switch (action.type) {
  case DAMAGE_REPORT_VALUES:
    return initialValue;
  default:
    return state;
  }
}

export function damageReportForm(state = initialState, action) {
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
      damageReport: action.damageReport,
    };
  case GET_CURRENT_DAMAGEREPORT:
    return {
      ...state,
      hasErrored: false,
      currentDamageReport: action.currentDamageReport,
    };
  case 'LOGOUT_SUCCESS':
    return initialState;
  default:
    return state;
  }
}
