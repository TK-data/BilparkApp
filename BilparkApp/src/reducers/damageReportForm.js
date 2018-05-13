import t from 'tcomb-form-native';
import { Dimensions } from 'react-native';
import { POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE, POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT, DAMAGE_REPORT_VALUES, NO_DAMAGE_REPORT_VALUES, DAMAGE_REPORT_OPTIONS } from '../actions/damageReportForm';

const width = Dimensions.get('window').width;

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

const formStylesheet = JSON.parse(JSON.stringify(t.form.Form.stylesheet));
formStylesheet.pickerContainer.normal.backgroundColor = '#fff';
formStylesheet.formGroup.normal.paddingRight = 10;
formStylesheet.formGroup.normal.paddingLeft = 10;
formStylesheet.formGroup.normal.flexDirection = 'row';
formStylesheet.formGroup.error.flexDirection = 'row';
formStylesheet.formGroup.normal.justifyContent = 'space-between';
// formStylesheet.textbox.normal.flex = 1;
// formStylesheet.textbox.error.flex = 1;
formStylesheet.formGroup.normal.alignItems = 'center';
formStylesheet.formGroup.normal.marginBottom = 10;
formStylesheet.textbox.normal.width = width * 0.9;
formStylesheet.checkbox.normal.marginBottom = 20;
formStylesheet.checkbox.normal.marginTop = 10;


const formOptions = {
  stylesheet: formStylesheet,
  auto: 'placeholder',
  fields: {
    KarosseriVenstre: {
      label: 'Venstre karosseri',
    },
    KarosseriVenstreBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    KarosseriHøyre: {
      label: 'Høyre karosseri',
    },
    KarosseriHøyreBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    StøtfangerFront: {
      label: 'Støtfanger front',
    },
    StøtfangerFrontBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    StøtfangerBak: {
      label: 'Støtfanger Bak',
    },
    StøtfangerBakBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    LysUtvendig: {
      label: 'Lys (utvendig)',
    },
    LysUtvendigBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    Glass: {
      label: 'Vinduer',
    },
    GlassBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
    FelgHjul: {
      label: 'Hjul (felg)',
    },
    FelgHjulBeskrivelse: {
      placeholder: 'Beskrivelse av skaden (Valgfritt)',
      hidden: true,
    },
  },
};

export function damageReportOptions(state = formOptions, action) {
  const fields = state.fields;
  switch (action.type) {
  case DAMAGE_REPORT_OPTIONS:
    fields.KarosseriVenstreBeskrivelse.hidden = !action.values.KarosseriVenstre;
    fields.KarosseriHøyreBeskrivelse.hidden = !action.values.KarosseriHøyre;
    fields.StøtfangerFrontBeskrivelse.hidden = !action.values.StøtfangerFront;
    fields.StøtfangerBakBeskrivelse.hidden = !action.values.StøtfangerBak;
    fields.LysUtvendigBeskrivelse.hidden = !action.values.LysUtvendig;
    fields.GlassBeskrivelse.hidden = !action.values.Glass;
    fields.FelgHjulBeskrivelse.hidden = !action.values.FelgHjul;
    return {
      ...state,
      fields,
    };
  default:
    return formOptions;
  }
}

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
