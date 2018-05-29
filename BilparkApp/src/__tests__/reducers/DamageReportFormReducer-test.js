import {
  POST_DAMAGEREPORT_REQUEST,
  POST_DAMAGEREPORT_FAILURE,
  REGISTER_DAMAGEREPORT,
  GET_CURRENT_DAMAGEREPORT,
  DAMAGE_REPORT_VALUES,
  NO_DAMAGE_REPORT_VALUES,
  DAMAGE_REPORT_OPTIONS } from '../../actions/damageReportForm';

import { damageReportOptions, damageReportValues, damageReportForm, initalState } from '../../reducers/damageReportForm';

const initialValue =
  {
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

const fields = {
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
};

describe('DamageReport reducer tests', () => {
  it('Should handle POST_DAMAGEREPORT_FAILURE', () => {
    expect(damageReportForm(initalState, {
      POST_DAMAGEREPORT_FAILURE,
      hasErrored: true,
    })).toEqual({
      currentDamageReport: {},
      damageReports: [],
      hasErrored: false,
      isLoading: false,
    });
  });
  it('Should handle POST_DAMAGEREPORT_REQUEST', () => {
    expect(damageReportForm(initalState, {
      POST_DAMAGEREPORT_REQUEST,
      hasErrored: false,
    })).toEqual({
      currentDamageReport: {},
      damageReports: [],
      hasErrored: false,
      isLoading: false,
    });
  });
  it('Should handle REGISTER_DAMAGEREPORT', () => {
    expect(damageReportForm(initalState, {
      REGISTER_DAMAGEREPORT,
      hasErrored: false,
    })).toEqual({
      currentDamageReport: {},
      damageReports: [],
      hasErrored: false,
      isLoading: false,
    });
  });
  it('Should handle GET_CURRENT_DAMAGEREPORT', () => {
    expect(damageReportForm(initalState, {
      GET_CURRENT_DAMAGEREPORT,
      hasErrored: false,
    })).toEqual({
      currentDamageReport: {},
      damageReports: [],
      hasErrored: false,
      isLoading: false,
    });
  });
  it('Should handle NO_DAMAGE_REPORT_VALUES', () => {
    expect(damageReportValues({}, {
      type: NO_DAMAGE_REPORT_VALUES,
    })).toEqual(initialValue);
  });
  it('Should handle NO_DAMAGE_REPORT_OPTIONS', () => {
    const defaultWhenNoOptions = {
      auto:
      'placeholder',
      fields:
        { FelgHjul: { label: 'Hjul (felg)' },
          FelgHjulBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          Glass: { label: 'Vinduer' },
          GlassBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          KarosseriHøyre: { label: 'Høyre karosseri' },
          KarosseriHøyreBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          KarosseriVenstre: { label: 'Venstre karosseri' },
          KarosseriVenstreBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          LysUtvendig: { label: 'Lys (utvendig)' },
          LysUtvendigBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          StøtfangerBak: { label: 'Støtfanger Bak' },
          StøtfangerBakBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' },
          StøtfangerFront: { label: 'Støtfanger front' },
          StøtfangerFrontBeskrivelse: { hidden: true, placeholder: 'Beskrivelse av skaden (Valgfritt)' } },
      stylesheet:
      {
        button: { alignSelf: 'stretch', backgroundColor: '#48BBEC', borderColor: '#48BBEC', borderRadius: 8, borderWidth: 1, height: 36, justifyContent: 'center', marginBottom: 10 },
        buttonText: { alignSelf: 'center', color: 'white', fontSize: 18 },
        checkbox:
         {
           error: { marginBottom: 4 },
           normal: { marginBottom: 20, marginTop: 10 },
         },
        controlLabel:
        { error:
          { color: '#a94442', fontSize: 17, fontWeight: '500', marginBottom: 7 },
        normal:
            { color: '#000000', fontSize: 17, fontWeight: '500', marginBottom: 7 },
        },
        dateTouchable:
            {
              error: {},
              normal: {},
            },
        dateValue:
            { error:
              {
                color: '#a94442', fontSize: 17, marginBottom: 5, padding: 7 },
            normal: { color: '#000000', fontSize: 17, marginBottom: 5, padding: 7 },
            },
        datepicker:
              {
                error: { marginBottom: 4 },
                normal: { marginBottom: 4 },
              },
        errorBlock: { color: '#a94442', fontSize: 17, marginBottom: 2 },
        fieldset: {},
        formGroup: { error: { flexDirection: 'row', marginBottom: 10 },
          normal: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, paddingLeft: 10, paddingRight: 10 },
        },
        helpBlock: { error: { color: '#999999', fontSize: 17, marginBottom: 2 },
          normal: { color: '#999999', fontSize: 17, marginBottom: 2 },
        },
        pickerContainer: { error: { borderColor: '#a94442', borderRadius: 4, borderWidth: 1, marginBottom: 4 },
          normal: { backgroundColor: '#fff', borderColor: '#cccccc', borderRadius: 4, borderWidth: 1, marginBottom: 4 },
          open: {},
        },
        pickerTouchable: { active: { borderBottomWidth: 1, borderColor: '#cccccc' },
          error: { alignItems: 'center', flexDirection: 'row', height: 44 },
          normal: { alignItems: 'center', flexDirection: 'row', height: 44 } },
        pickerValue: { error: { fontSize: 17, paddingLeft: 7 },
          normal: { fontSize: 17, paddingLeft: 7 } },
        select: { error: {}, normal: {},
        },
        textbox:
                          {
                            error: { borderColor: '#a94442', borderRadius: 4, borderWidth: 1, color: '#000000', fontSize: 17, height: 36, marginBottom: 5, paddingHorizontal: 7, paddingVertical: 7 },
                            normal: { borderColor: '#cccccc', borderRadius: 4, borderWidth: 1, color: '#000000', fontSize: 17, height: 36, marginBottom: 5, marginTop: -15, paddingHorizontal: 7, paddingVertical: 7, width: 675 },
                            notEditable: { backgroundColor: '#eeeeee', borderColor: '#cccccc', borderRadius: 4, borderWidth: 1, color: '#777777', fontSize: 17, height: 36, marginBottom: 5, paddingHorizontal: 7, paddingVertical: 7 },
                          },
        textboxView: { error: {}, normal: {}, notEditable: {} },
      },
    };


    expect(damageReportOptions({}, {
    })).toEqual(defaultWhenNoOptions);
  });
  it('Should handle DAMAGE_REPORT_VALUES', () => {
    const Items = [
      {
        ItemType: 'Wheel',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'Window',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'CarLight',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'FrontBumper',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'BackBumper',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'RightBodyWork',
        Damaged: false,
        Description: '',
      },
      {
        ItemType: 'LeftBodyWork',
        Damaged: false,
        Description: '',
      },
    ];
    const initialValues =
    {
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
    expect(damageReportValues({ Items }, {
      type: DAMAGE_REPORT_VALUES,
      currentDamageReportValues: Items,
    })).toEqual(initialValues);
  });
  it('Should handle DAMAGE_REPORT_OPTIONS', () => {
    const values = {
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
    const defaultOpt = {
      fields,
    };

    expect(damageReportOptions({ fields }, {
      type: DAMAGE_REPORT_OPTIONS,
      values,
    })).toEqual(defaultOpt);
  });
});
