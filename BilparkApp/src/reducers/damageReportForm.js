import { POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE, POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT, DAMAGE_REPORT_VALUES } from '../actions/damageReportForm';

const initialState = {
  hasErrored: false,
  isLoading: false,
  damageReports: [],
  currentDamageReport: {},
};

const initialValue = {
  KarosseriVenstre: false,
  KarosseriVenstreBeskrivelse: '',
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
    return {
      KarosseriVenstre: action.currentDamageReportValues[6].Damaged,
      KarosseriHøyre: action.currentDamageReportValues[5].Damaged,
      StøtfangerFront: action.currentDamageReportValues[4].Damaged,
      StøtfangerBak: action.currentDamageReportValues[3].Damaged,
      LysUtvendig: action.currentDamageReportValues[2].Damaged,
      Glass: action.currentDamageReportValues[1].Damaged,
      FelgHjul: action.currentDamageReportValues[0].Damaged,
      KarosseriVenstreBeskrivelse: action.currentDamageReportValues[6].Description,
      KarosseriHøyreBeskrivelse: action.currentDamageReportValues[5].Description,
      StøtfangerFrontBeskrivelse: action.currentDamageReportValues[4].Description,
      StøtfangerBakBeskrivelse: action.currentDamageReportValues[3].Description,
      LysUtvendigBeskrivelse: action.currentDamageReportValues[2].Description,
      GlassBeskrivelse: action.currentDamageReportValues[1].Description,
      FelgHjulBeskrivelse: action.currentDamageReportValues[0].Description,
    };
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
