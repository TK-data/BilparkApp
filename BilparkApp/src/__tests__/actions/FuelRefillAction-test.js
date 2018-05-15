import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  postFuelRefillFailure, getFuelRefills, postFuelRefillLoading, deleteFuelRefill, postFuelRefill, removeFuelRefill,
  registerFuelRefill, POST_FUELREFILL_REQUEST, POST_FUELREFILL_SUCCESS, POST_FUELREFILL_FAILURE,
  REMOVE_FUELREFILL, REGISTER_FUELREFILL,
}
  from '../../actions/fuelRefill';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actions', () => {
  it('should create an action to add a successfull failure of posting a fuelrefill', () => {
    const data = false;
    const expectedAction = {
      type: 'POST_FUELREFILL_FAILURE',
      hasErrored: false,
    };
    expect(postFuelRefillFailure(data)).toEqual(expectedAction);
  });

  it('should create an action to start the loading of posting a fuelrefill request', () => {
    const data = true;
    const expectedAction = {
      type: 'POST_FUELREFILL_REQUEST',
      isLoading: true,
    };
    expect(postFuelRefillLoading(data)).toEqual(expectedAction);
  });
  it('should create an action to delete the registered fuel refill', () => {
    const data = '123123';
    const expectedAction = {
      type: 'REMOVE_FUELREFILL',
      RefillID: '123123',
    };
    expect(removeFuelRefill(data)).toEqual(expectedAction);
  });
  it('should create an action to register the registered fuel refill', () => {
    const data = '123123';
    const expectedAction = {
      type: 'REGISTER_FUELREFILL',
      RefillItem: '123123',
    };
    expect(registerFuelRefill(data)).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  // set rules for the axios mocker
  let axiosMock = new MockAdapter(axios);
  // after each test is run, it resets and restores the mocker
  // so you can define in the next test what you want it to do {
  // https://github.com/ctimmerm/axios-mock-adapter
  afterEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  it('Creates POST_FUELREFILL_FAILURE when registering a fuel refill is failed', () => {
    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_FAILURE,
        hasErrored: true,
      },
    ];

    axiosMock.onPost().reply(404);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(postFuelRefill('testfuelRefills')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('Creates POST_FUELREFILL_SUCCESS when registering a fuel refill is successful', () => {

    const fuelrefill = {
      Rate: 5.5,
      FuelTime: '24-03-18',
      Price: 10,
    };

    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: false,
      },
      {
        type: REGISTER_FUELREFILL,
        RefillItem: fuelrefill,
      },
    ];

    axiosMock.onPost().reply(200, fuelrefill);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(postFuelRefill('24-03-18', 10, 5.5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates REMOVE_FUELREFILL when removing a fuel refill is successful', () => {

    const fuelrefill = {
      RefillID: 5,
    };

    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: false,
      },
      {
        type: REMOVE_FUELREFILL,
        RefillID: 5,
      },
    ];

    axiosMock.onPost().reply(200, fuelrefill);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(deleteFuelRefill(5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates POST_FUELREFILL_FAILURE when removing a fuel refill is unsuccessful', () => {


    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_FAILURE,
        hasErrored: true,
      },
    ];

    axiosMock.onPost().reply(404);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(deleteFuelRefill(5)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates POST_FUELREFILL_SUCCESS when getting fuel refills is successful', () => {

    const fuelrefills = [
      {
        FuelTime: '24-03-2018',
        Rate: 5,
        Price: 10,
        RefillID: 0,
      },
      {
        FuelTime: '24-05-2018',
        Rate: 8.5,
        Price: 45,
        RefillID: 2,
      },
    ];

    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: false,
      },
      {
        type: POST_FUELREFILL_SUCCESS,
        fuelRefills: fuelrefills,
      },
    ];

    axiosMock.onGet().reply(200, fuelrefills);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(getFuelRefills()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates POST_FUELREFILL_FAILURE when getting fuel refills is unsuccessful', () => {

    const expectedActions = [
      {
        type: POST_FUELREFILL_REQUEST,
        isLoading: true,
      },
      {
        type: POST_FUELREFILL_FAILURE,
        hasErrored: true,
      },
    ];

    axiosMock.onGet().reply(404);
    // create a mock of the store
    const store = mockStore({});
    // run the dispatch of postFuelRefill.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(getFuelRefills()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
