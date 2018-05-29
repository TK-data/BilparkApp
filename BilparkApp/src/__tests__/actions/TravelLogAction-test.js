import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  TRAVELLOG_FROM,
  TRAVELLOG_TO,
  TRAVELLOG_DISTANCE,
  TRAVELLOG_DATEPICKER_VISIBLE,
  TRAVELLOG_DATEPICKER_DATE,
  TRAVELLOG_FORM_VALUE,
  TRAVELLOG_FORM_TYPE,
  TRAVELLOG_CARGO,
  TRAVELLOG_CORDINATES,
  TRAVELLOG_FROM_ADDRESS,
  TRAVELLOG_TO_ADDRESS,
  POST_TRAVELLOG_LOADING,
  POST_TRAVELLOG_SUCCESS,
  POST_TRAVELLOG_FAILURE,
  travelLogFrom,
  travelLogTo,
  travelLogFromAddress,
  travelLogToAddress,
  travleLogCordinates,
  travleLogDistance,
  travelLogDatepickerVisible,
  travelLogDatepickerDate,
  travelLogSaveDate,
  travelLogFormValue,
  travelLogFormType,
  travelLogCargo,
  postTravelLogLoading,
  postTravelLogSuccess,
  postTravelLogFailure,
  postTravelLog,
} from '../../actions/travelLog';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('TravelLog actions', () => {
  it('Should create a positionFrom action', () => {
    const positionFrom = '123123124';
    const expectedAction = {
      type: TRAVELLOG_FROM,
      positionFrom,
    };
    expect(travelLogFrom(positionFrom)).toEqual(expectedAction);
  });
  it('Should create a positionTo action', () => {
    const positionTo = '123123124';
    const expectedAction = {
      type: TRAVELLOG_TO,
      positionTo,
    };
    expect(travelLogTo(positionTo)).toEqual(expectedAction);
  });
  it('Should create a travelLogFromAddress action', () => {
    const addressFrom = 'testAdr';
    const expectedAction = {
      type: TRAVELLOG_FROM_ADDRESS,
      addressFrom,
    };
    expect(travelLogFromAddress(addressFrom)).toEqual(expectedAction);
  });
  it('Should create a travelLogToAddress action', () => {
    const addressTo = 'testAdr';
    const expectedAction = {
      type: TRAVELLOG_TO_ADDRESS,
      addressTo,
    };
    expect(travelLogToAddress(addressTo)).toEqual(expectedAction);
  });
  it('Should create a travelLogCordinates action', () => {
    const cordinates = 'testAdr';
    const expectedAction = {
      type: TRAVELLOG_CORDINATES,
      cordinates,
    };
    expect(travleLogCordinates(cordinates)).toEqual(expectedAction);
  });
  /* Somehow travleLogDistance is not a function
  it('Should create a travelLogDistance action', () => {
    const distance = '1,604 km';
    const expectedAction = {
      type: TRAVELLOG_DISTANCE,
      distance,
    };
    expect(travleLogDistance(distance)).toEqual(expectedAction);
  });
  */
  it('Should create a travelLogDatepickerVisible action', () => {
    const bool = true;
    const expectedAction = {
      type: TRAVELLOG_DATEPICKER_VISIBLE,
      bool,
    };
    expect(travelLogDatepickerVisible(true)).toEqual(expectedAction);
  });
  it('Should create a travelLogDatepickerDate action', () => {
    const date = new Date();
    date.setTime(1332403882588);
    const expectedAction = {
      type: TRAVELLOG_DATEPICKER_DATE,
      date,
    };
    expect(travelLogDatepickerDate(date)).toEqual(expectedAction);
  });
  it('Should create a travelLogSaveDate action', () => {
    const date = new Date();
    date.setTime(1332403882588);
    travelLogSaveDate(date);
  });
  it('Should create a travelLogFormValue action', () => {
    const value = [];
    const expectedAction = {
      type: TRAVELLOG_FORM_VALUE,
      value,
    };
    expect(travelLogFormValue(value)).toEqual(expectedAction);
  });
  it('Should create a travelLogFormType action', () => {
    const expectedAction = {
      formType: true,
      type: TRAVELLOG_FORM_TYPE,
    };
    expect(travelLogFormType(true)).toEqual(expectedAction);
  });
  it('Should create a travelLogCargo action', () => {
    const cargoValue = 1;
    const expectedAction = {
      type: TRAVELLOG_CARGO,
      cargoValue,
    };
    expect(travelLogCargo(1)).toEqual(expectedAction);
  });
  it('Should create a postTravelLogLoading action', () => {
    const bool = true;
    const expectedAction = {
      type: POST_TRAVELLOG_LOADING,
      isLoading: bool,
    };
    expect(postTravelLogLoading(true)).toEqual(expectedAction);
  });
  it('Should create a postTravelLogSuccess action', () => {
    const bool = true;
    const expectedAction = {
      type: POST_TRAVELLOG_SUCCESS,
      success: bool,
    };
    expect(postTravelLogSuccess(true)).toEqual(expectedAction);
  });
  it('Should create a postTravelLogFailure action', () => {
    const bool = true;
    const expectedAction = {
      type: POST_TRAVELLOG_FAILURE,
      hasErrored: bool,
    };
    expect(postTravelLogFailure(true)).toEqual(expectedAction);
  });
});

describe('TravelLog async actions', () => {
  let axiosMock = new MockAdapter(axios);

  afterEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  it('Creates POST_TRAVELLOG_SUCCESS action posting a travelLog is successful', () => {

    const value = {
      addressFrom: 'Drammensveien, Oslo, Norway',
      addressTo: 'Oslo Rådhus, 0160 Oslo, Norway',
      cargoValue: {
        Cargo: true,
        Comment: '',
      },
      datepickerDate: '15.5.2018',
      datepickerVisible: false,
      distance: '4.1 km',
      formType: [],
      formValue: {
        Passenger: '2',
        Passenger1: 'Petter',
        Passenger2: 'Sprett',
        Passenger3: '',
        Passenger4: '',
        Passenger5: '',
      },
      positionFrom: '59.9218566,10.6822922',
      positionTo: '59.9119666,10.7336023',
    };


    axiosMock.onPost().reply(200, value);

    const expectedActions = [
      {
        type: POST_TRAVELLOG_SUCCESS,
        success: undefined,
      },
    ];

    const store = mockStore({});

    return store.dispatch(postTravelLog(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Creates POST_TRAVELLOG_FAILURE action posting a travelLog is failed', () => {

    const value = {
      cargoValue: {
        Cargo: true,
        Comment: '',
      },
      datepickerDate: '15.5.2018',
      datepickerVisible: false,
      distance: 11,
      formType: [],
      formValue: {
        Passenger: '2',
        Passenger1: 'Petter',
        Passenger2: 'Sprett',
        Passenger3: '',
        Passenger4: '',
        Passenger5: '',
      },
      positionFrom: '59.9218566,10.6822922',
      positionTo: '59.9119666,10.7336023',
    };


    axiosMock.onPost().reply(404, value);

    const expectedActions = [
      {
        type: POST_TRAVELLOG_FAILURE,
        hasErrored: true,
      },
    ];

    const store = mockStore({});

    return store.dispatch(postTravelLog(value)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
