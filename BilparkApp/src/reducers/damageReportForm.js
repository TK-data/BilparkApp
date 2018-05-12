import { POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE, POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT, DAMAGE_REPORT_VALUES, NO_DAMAGE_REPORT_VALUES } from '../actions/damageReportForm';

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
  const itemArray = action.currentDamageReportValues;
  switch (action.type) {
  case DAMAGE_REPORT_VALUES:
    return {
      KarosseriVenstre: itemArray.find(x => x.ItemType === 'LeftBodyWork').Damaged,
      KarosseriHøyre: itemArray.find(x => x.ItemType === 'RightBodyWork').Damaged,
      StøtfangerFront: itemArray.find(x => x.ItemType === 'FrontBumper').Damaged,
      StøtfangerBak: itemArray.find(x => x.ItemType === 'BackBumper').Damaged,
      LysUtvendig: itemArray.find(x => x.ItemType === 'CarLight').Damaged,
      Glass: itemArray.find(x => x.ItemType === 'Window').Damaged,
      FelgHjul: itemArray.find(x => x.ItemType === 'Wheel').Damaged,
      KarosseriVenstreBeskrivelse: itemArray.find(x => x.ItemType === 'LeftBodyWork').Description,
      KarosseriHøyreBeskrivelse: itemArray.find(x => x.ItemType === 'RightBodyWork').Description,
      StøtfangerFrontBeskrivelse: itemArray.find(x => x.ItemType === 'FrontBumper').Description,
      StøtfangerBakBeskrivelse: itemArray.find(x => x.ItemType === 'BackBumper').Description,
      LysUtvendigBeskrivelse: itemArray.find(x => x.ItemType === 'CarLight').Description,
      GlassBeskrivelse: itemArray.find(x => x.ItemType === 'Window').Description,
      FelgHjulBeskrivelse: itemArray.find(x => x.ItemType === 'Wheel').Description,
    };
  case NO_DAMAGE_REPORT_VALUES:
    return { initialValue };
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
