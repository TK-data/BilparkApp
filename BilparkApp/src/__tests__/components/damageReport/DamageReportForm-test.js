import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import t from 'tcomb-form-native';
import { Button } from 'native-base';

import damageReportValues from '../../../actions/damageReportForm';

import DamageReportForm from '../../../components/damageReport/DamageReportForm';

const Items = [
  {
    ItemType: 'Wheel',
    Damaged: false,
  },
  {
    ItemType: 'Window',
    Damaged: false,
  },
  {
    ItemType: 'CarLight',
    Damaged: false,
  },
  {
    ItemType: 'FrontBumper',
    Damaged: false,
  },
  {
    ItemType: 'BackBumper',
    Damaged: false,
  },
  {
    ItemType: 'RightBodyWork',
    Damaged: false,
  },
  {
    ItemType: 'LeftBodyWork',
    Damaged: false,
  },
];

const initialState = {
  damageReportForm: {
    isLoading: true,
    hasErrored: false,
    currentDamageReport: [
      {
        ItemType: 'Wheel',
        Damaged: false,
      },
      {
        ItemType: 'Window',
        Damaged: false,
      },
      {
        ItemType: 'CarLight',
        Damaged: false,
      },
      {
        ItemType: 'FrontBumper',
        Damaged: false,
      },
      {
        ItemType: 'BackBumper',
        Damaged: false,
      },
      {
        ItemType: 'RightBodyWork',
        Damaged: false,
      },
      {
        ItemType: 'LeftBodyWork',
        Damaged: false,
      },
    ],
    values: [
      {
        ItemType: 'Wheel',
        Damaged: false,
      },
      {
        ItemType: 'Window',
        Damaged: false,
      },
      {
        ItemType: 'CarLight',
        Damaged: false,
      },
      {
        ItemType: 'FrontBumper',
        Damaged: false,
      },
      {
        ItemType: 'BackBumper',
        Damaged: false,
      },
      {
        ItemType: 'RightBodyWork',
        Damaged: false,
      },
      {
        ItemType: 'LeftBodyWork',
        Damaged: false,
      },
    ],
    testValues: false,
  },
  values: [
    {
      ItemType: 'Wheel',
      Damaged: false,
    },
    {
      ItemType: 'Window',
      Damaged: false,
    },
    {
      ItemType: 'CarLight',
      Damaged: false,
    },
    {
      ItemType: 'FrontBumper',
      Damaged: false,
    },
    {
      ItemType: 'BackBumper',
      Damaged: false,
    },
    {
      ItemType: 'RightBodyWork',
      Damaged: false,
    },
    {
      ItemType: 'LeftBodyWork',
      Damaged: false,
    },
  ],
  auth: {
    car: 'testcar',
  },
  damageReportOptions: {
    formOptions: 'testoptions',
  },
  currentDamageReport: {
    Items: 'testItems',
  },
};

const bigInitialState = {
  damageReportForm: {
    currentDamageReport: {
      CarID: 34,
      DamageReportID: 187,
      Items: [
        {
          DamageReportID: 187,
          Damaged: false,
          Description: null,
          ItemID: 92,
          ItemType: 'Wheel',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: true,
          Description: 'Bra nå',
          ItemID: 93,
          ItemType: 'BackBumper',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: false,
          Description: null,
          ItemID: 94,
          ItemType: 'Window',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: false,
          Description: null,
          ItemID: 95,
          ItemType: 'CarLight',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: true,
          Description: 'Est av emil',
          ItemID: 96,
          ItemType: 'FrontBumper',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: false,
          Description: null,
          ItemID: 97,
          ItemType: 'LeftBodyWork',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
        {
          DamageReportID: 187,
          Damaged: false,
          Description: null,
          ItemID: 98,
          ItemType: 'RightBodyWork',
          createdAt: '2018-05-14T13:45:59.000Z',
          updatedAt: '2018-05-14T13:45:59.000Z',
        },
      ],
      UserID: 49,
      createdAt: '2018-05-14T13:45:59.000Z',
      updatedAt: '2018-05-14T13:45:59.000Z',
    },
    damageReports: [],
    hasErrored: false,
    isLoading: false,
  },
  damageReportOptions: {
    auto: 'placeholder',
    fields: {
      FelgHjul: {
        label: 'Hjul (felg)',
      },
      FelgHjulBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      Glass: {
        label: 'Vinduer',
      },
      GlassBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      KarosseriHøyre: {
        label: 'Høyre karosseri',
      },
      KarosseriHøyreBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      KarosseriVenstre: {
        label: 'Venstre karosseri',
      },
      KarosseriVenstreBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      LysUtvendig: {
        label: 'Lys (utvendig)',
      },
      LysUtvendigBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      StøtfangerBak: {
        label: 'Støtfanger Bak',
      },
      StøtfangerBakBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
      StøtfangerFront: {
        label: 'Støtfanger front',
      },
      StøtfangerFrontBeskrivelse: {
        hidden: true,
        placeholder: 'Beskrivelse av skaden (Valgfritt)',
      },
    },
    stylesheet: {
      button: {
        alignSelf: 'stretch',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderRadius: 8,
        borderWidth: 1,
        height: 36,
        justifyContent: 'center',
        marginBottom: 10,
      },
      buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 18,
      },
      checkbox: {
        error: {
          marginBottom: 4,
        },
        normal: {
          marginBottom: 20,
          marginTop: 10,
        },
      },
      controlLabel: {
        error: {
          color: '#fff',
          fontSize: 17,
          fontWeight: '500',
          marginBottom: 7,
        },
        normal: {
          color: '#fff',
          fontSize: 17,
          fontWeight: '500',
          marginBottom: 7,
        },
      },
      dateTouchable: {
        error: {},
        normal: {},
      },
      dateValue: {
        error: {
          color: '#a94442',
          fontSize: 17,
          marginBottom: 5,
          padding: 7,
        },
        normal: {
          color: '#000000',
          fontSize: 17,
          marginBottom: 5,
          padding: 7,
        },
      },
      datepicker: {
        error: {
          marginBottom: 4,
        },
        normal: {
          marginBottom: 4,
        },
      },
      errorBlock: {
        color: '#db2b1e',
        fontSize: 17,
        marginBottom: 2,
      },
      fieldset: {},
      formGroup: {
        error: {
          flexDirection: 'row',
          marginBottom: 10,
          width: 355,
        },
        normal: {
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 10,
          paddingLeft: 10,
          paddingRight: 10,
          width: 355,
        },
      },
      helpBlock: {
        error: {
          color: '#999999',
          fontSize: 17,
          marginBottom: 2,
        },
        normal: {
          color: '#999999',
          fontSize: 17,
          marginBottom: 2,
        },
      },
      pickerContainer: {
        error: {
          borderColor: '#a94442',
          borderRadius: 4,
          borderWidth: 1,
          marginBottom: 4,
        },
        normal: {
          backgroundColor: '#fff',
          borderColor: '#cccccc',
          borderRadius: 4,
          borderWidth: 1,
          marginBottom: 4,
        },
        open: {},
      },
      pickerTouchable: {
        active: {
          borderBottomWidth: 1,
          borderColor: '#cccccc',
        },
        error: {
          alignItems: 'center',
          flexDirection: 'row',
          height: 44,
        },
        normal: {
          alignItems: 'center',
          flexDirection: 'row',
          height: 44,
        },
      },
      pickerValue: {
        error: {
          fontSize: 17,
          paddingLeft: 7,
        },
        normal: {
          fontSize: 17,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 7,
        },
      },
      select: {
        error: {},
        normal: {},
      },
      textbox: {
        error: {
          backgroundColor: '#fff',
          borderColor: '#a94442',
          borderRadius: 4,
          borderWidth: 3,
          color: '#000000',
          fontSize: 20,
          height: 40,
          marginBottom: 5,
          paddingHorizontal: 7,
          paddingVertical: 7,
        },
        normal: {
          backgroundColor: '#fff',
          borderColor: '#cccccc',
          borderRadius: 4,
          borderWidth: 1,
          color: '#000',
          fontSize: 20,
          height: 40,
          marginBottom: 5,
          marginTop: -15,
          paddingHorizontal: 7,
          paddingVertical: 7,
          width: 337.5,
        },
        notEditable: {
          backgroundColor: '#eeeeee',
          borderColor: '#cccccc',
          borderRadius: 4,
          borderWidth: 1,
          color: '#777777',
          fontSize: 17,
          height: 36,
          marginBottom: 5,
          paddingHorizontal: 7,
          paddingVertical: 7,
        },
      },
      textboxView: {
        error: {},
        normal: {},
        notEditable: {},
      },
    },
  },
  damageReportValues: {
    FelgHjul: false,
    FelgHjulBeskrivelse: null,
    Glass: false,
    GlassBeskrivelse: null,
    KarosseriHøyre: false,
    KarosseriHøyreBeskrivelse: null,
    KarosseriVenstre: false,
    KarosseriVenstreBeskrivelse: null,
    LysUtvendig: false,
    LysUtvendigBeskrivelse: null,
    StøtfangerBak: true,
    StøtfangerBakBeskrivelse: 'Bra nå',
    StøtfangerFront: true,
    StøtfangerFrontBeskrivelse: 'Est av emil',
  },
  auth: {
    car: 'testcar',
  },
};


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing DamageReportForm', () => {
  let store;
  // set up a fake store for all our tests
  beforeEach(() => {
    store = mockStore({ values: {} });
  });

  it('Renders as expected', () => {
    const comp = shallow(
      <DamageReportForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  const wrapper = shallow(
    <DamageReportForm value={Items} />,
    { context: { store: mockStore(bigInitialState) } },
  );
  const Form = t.form.Form;
  it('Containts the form', () => {
    const render = wrapper.dive().dive();
    expect(render.find(Form).exists());
  });
  it('Contains the register button', () => {
    const render = wrapper.dive().dive();
    expect(render.find(Button).exists());
  });
  it('Can press the register button', () => {
    // const render = wrapper.dive().dive();
    // const registerButton = render.find(Button);
    // registerButton.simulate('press');
  });
  it('Can use the onChange function', () => {
    const values = {
      FelgHjul: false,
      FelgHjulBeskrivelse: null,
      Glass: false,
      GlassBeskrivelse: null,
      KarosseriHøyre: false,
      KarosseriHøyreBeskrivelse: null,
      KarosseriVenstre: false,
      KarosseriVenstreBeskrivelse: null,
      LysUtvendig: false,
      LysUtvendigBeskrivelse: null,
      StøtfangerBak: false,
      StøtfangerBakBeskrivelse: '',
      StøtfangerFront: false,
      StøtfangerFrontBeskrivelse: '',
    };
    wrapper.dive().instance().onChange(values);
  });
  it('Can use the handleSubmit function', () => {
    wrapper.dive().instance().handleSubmit();
  });
});
