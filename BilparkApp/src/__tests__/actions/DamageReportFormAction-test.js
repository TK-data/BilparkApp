import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postDamageReportFailure, postDamageReportLoading,
  postDamageReportSuccess, registerDamageReport, getCurrentDamageReportSuccess,
  damageReportValues, noDamageReportValues, damageReportOptions,
  transformDamageReport, getDamageReport, getCurrentDamageReport,
  POST_DAMAGEREPORT_REQUEST, POST_DAMAGEREPORT_FAILURE,
  POST_DAMAGEREPORT_SUCCESS, REGISTER_DAMAGEREPORT, GET_CURRENT_DAMAGEREPORT,
  DAMAGE_REPORT_VALUES, NO_DAMAGE_REPORT_VALUES, DAMAGE_REPORT_OPTIONS }
  from '../../actions/damageReportForm';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const returnedDamageReport = {
  CarID: 34,
  DamageReportID: 177,
  UserID: 49,
  createdAt: '2018-05-14T07:59:44.799Z',
  updatedAt: '2018-05-14T07:59:44.799Z',
  Items: [
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 334,
      ItemType: 'Wheel',
      createdAt: '2018-05-14T07:59:44.846Z',
      updatedAt: '2018-05-14T07:59:44.846Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 335,
      ItemType: 'Window',
      createdAt: '2018-05-14T07:59:44.846Z',
      updatedAt: '2018-05-14T07:59:44.846Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 336,
      ItemType: 'CarLight',
      createdAt: '2018-05-14T07:59:44.847Z',
      updatedAt: '2018-05-14T07:59:44.847Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 337,
      ItemType: 'FrontBumper',
      createdAt: '2018-05-14T07:59:44.847Z',
      updatedAt: '2018-05-14T07:59:44.847Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 338,
      ItemType: 'BackBumper',
      createdAt: '2018-05-14T07:59:44.847Z',
      updatedAt: '2018-05-14T07:59:44.847Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 339,
      ItemType: 'RightBodyWork',
      createdAt: '2018-05-14T07:59:44.848Z',
      updatedAt: '2018-05-14T07:59:44.848Z',
    },
    {
      DamageReportID: 177,
      Damaged: false,
      Description: null,
      ItemID: 340,
      ItemType: 'LeftBodyWork',
      createdAt: '2018-05-14T07:59:44.848Z',
      updatedAt: '2018-05-14T07:59:44.848Z',
    },
  ],
};

const damageReportItems = [
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

describe('Testing DamageReport actions', () => {
  it('Should create an action when DamageReport fetch fails', () => {
    const expectedAction = {
      type: POST_DAMAGEREPORT_FAILURE,
      hasErrored: true,
    };
    expect(postDamageReportFailure(true)).toEqual(expectedAction);
  });

  it('Should create an action to show that DamageReport fetch is loading', () => {
    const expectedAction = {
      type: POST_DAMAGEREPORT_REQUEST,
      isLoading: true,
    };
    expect(postDamageReportLoading(true)).toEqual(expectedAction);
  });

  it('Should create an action to register a damageReport', () => {
    const damagereport = {};
    const expectedAction = {
      type: REGISTER_DAMAGEREPORT,
      damagereport,
    };
    expect(registerDamageReport(damagereport)).toEqual(expectedAction);
  });
  it('Should create an action to successfully get the current damageReport', () => {
    const damagereport = {};
    const expectedAction = {
      type: GET_CURRENT_DAMAGEREPORT,
      currentDamageReport: damagereport,
    };
    expect(getCurrentDamageReportSuccess(damagereport)).toEqual(expectedAction);
  });
  it('Should create an action to successfully get damageReport values', () => {
    const values = {};
    const expectedAction = {
      type: DAMAGE_REPORT_VALUES,
      currentDamageReportValues: values,
    };
    expect(damageReportValues(values)).toEqual(expectedAction);
  });
  it('Should create an action to get default damageReport values', () => {
    const expectedAction = {
      type: NO_DAMAGE_REPORT_VALUES,
    };
    expect(noDamageReportValues()).toEqual(expectedAction);
  });
  it('Should create an action to get damageReport options', () => {
    const values = {};
    const expectedAction = {
      type: DAMAGE_REPORT_OPTIONS,
      values,
    };
    expect(damageReportOptions(values)).toEqual(expectedAction);
  });
});

describe('Testing DamageReport async actions', () => {
  // set rules for the axios mocker
  let axiosMock = new MockAdapter(axios);

  // after each test is run, it resets and restores the mocker
  // so you can define in the next test what you want it to do {
  // https://github.com/ctimmerm/axios-mock-adapter
  afterEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  it('Creates NO_DAMAGE_REPORT_VALUES when getting current DamageReport fails', () => {
    const expectedActions = [
      {
        type: POST_DAMAGEREPORT_REQUEST,
        isLoading: true,
      },
      {
        type: POST_DAMAGEREPORT_REQUEST,
        isLoading: false,
      },
      {
        type: 'NO_DAMAGE_REPORT_VALUES',
      },
    ];
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(getCurrentDamageReport()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Creates GET_CURRENT_DAMAGEREPORT when getting current DamageReport succeeds', () => {
    axiosMock.onGet().reply(200, returnedDamageReport);

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
      StøtfangerBakBeskrivelse: null,
      StøtfangerFront: false,
      StøtfangerFrontBeskrivelse: null,
    };

    const currentdamagereportvalues =
    [
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 334, ItemType: 'Wheel', createdAt: '2018-05-14T07:59:44.846Z', updatedAt: '2018-05-14T07:59:44.846Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 335, ItemType: 'Window', createdAt: '2018-05-14T07:59:44.846Z', updatedAt: '2018-05-14T07:59:44.846Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 336, ItemType: 'CarLight', createdAt: '2018-05-14T07:59:44.847Z', updatedAt: '2018-05-14T07:59:44.847Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 337, ItemType: 'FrontBumper', createdAt: '2018-05-14T07:59:44.847Z', updatedAt: '2018-05-14T07:59:44.847Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 338, ItemType: 'BackBumper', createdAt: '2018-05-14T07:59:44.847Z', updatedAt: '2018-05-14T07:59:44.847Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 339, ItemType: 'RightBodyWork', createdAt: '2018-05-14T07:59:44.848Z', updatedAt: '2018-05-14T07:59:44.848Z' },
      { DamageReportID: 177, Damaged: false, Description: null, ItemID: 340, ItemType: 'LeftBodyWork', createdAt: '2018-05-14T07:59:44.848Z', updatedAt: '2018-05-14T07:59:44.848Z' },
    ];

    const expectedActions = [
      {
        type: POST_DAMAGEREPORT_REQUEST,
        isLoading: true,
      },
      {
        type: POST_DAMAGEREPORT_REQUEST,
        isLoading: false,
      },
      {
        type: GET_CURRENT_DAMAGEREPORT,
        currentDamageReport: returnedDamageReport,
      },
      { type: DAMAGE_REPORT_VALUES,
        currentDamageReportValues: currentdamagereportvalues,
      },
      {
        type: DAMAGE_REPORT_OPTIONS,
        values,
      },
    ];
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(getCurrentDamageReport()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
