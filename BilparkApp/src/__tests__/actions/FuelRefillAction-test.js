import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postFuelRefillFailure, postFuelRefillLoading, postFuelRefill, removeFuelRefill, registerFuelRefill } from '../../actions/fuelRefill';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actions', () => {
  it('should create an action to add a successfull failure of posting a fuel day', () => {
    const data = false;
    const expectedAction = {
      type: 'POST_FUELREFILL_FAILURE',
      hasErrored: false,
    };
    expect(postFuelRefillFailure(data)).toEqual(expectedAction);
  });

  it('should create an action to start the loading of posting a fuelday request', () => {
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
  const axiosMock = new MockAdapter(axios);

  // after each test is run, it resets and restores the mocker
  // so you can define in the next test what you want it to do {
  // https://github.com/ctimmerm/axios-mock-adapter
  afterEach(() => {
    axiosMock.reset();
    axiosMock.restore();
  });

  // in the postFuelRefill dispatch:
  // sets loading to true,
  // get response, set loading to false
  // update user object.
  // order of the actions listed is important!
  const expectedActions = [
    {
      type: 'POST_FUELREFILL_REQUEST',
      isLoading: true,
    },
    {
      type: 'POST_FUELREFILL_REQUEST',
      isLoading: false,
    },
  ];

  // create a mock of the store
  const store = mockStore({});

  // run the dispatch of postFuelRefill.
  // then compare the actions expected with the ones in the mock store
  return store.dispatch(postFuelRefill(0, true)).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});
