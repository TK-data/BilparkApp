import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postFuelDayFailure, postFuelDayLoading, postFuelDaySuccess, postFuelDay } from '../../actions/fuelDay';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actions', () => {
  it('should create an action to add a successfull failure of posting a fuel day', () => {
    const data = false;
    const expectedAction = {
      type: 'POST_FUELDAY_FAILURE',
      hasErrored: false,
    };
    expect(postFuelDayFailure(data)).toEqual(expectedAction);
  });

  it('should create an action to start the loading of posting a fuelday request', () => {
    const data = true;
    const expectedAction = {
      type: 'POST_FUELDAY_REQUEST',
      isLoading: true,
    };
    expect(postFuelDayLoading(data)).toEqual(expectedAction);
  });

  it('should create an action to update the user object in store with the returned user object when setting a fuel day', () => {
    const user = {
      Email: 'ama@a.com',
      Fname: 'Erling',
      Lname: 'I',
      Address: 'Krok80',
      FuelNotification: true,
      UserID: 3,
      FuelDay: 0,
    };
    const expectedAction = {
      type: 'POST_USER_SUCCESS',
      isLoggedIn: true,
      user,
    };
    expect(postFuelDaySuccess(user)).toEqual(expectedAction);
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

  // first test, checks the actions added after running a successfull fuelday post
  it('creates POST_USER_SUCCESS action when posting a fuelday is successfull', () => {
    // a mock user object response for when you post fuelday
    const mockResponseUser = {
      Email: 'aaaa@a.com',
      Fname: 'er',
      Lname: 'ling',
      Address: 'krok 80',
      FuelNotification: true,
      UserID: 4,
      FuelDay: 5,
    };

    // mocks that every call to /api/User/notification will have a 200 OK response
    // + user object with notification
    axiosMock.onPost().reply(200, mockResponseUser);


    // in the postFuelDay dispatch:
    // sets loading to true,
    // get response, set loading to false
    // update user object.
    // order of the actions listed is important!
    const expectedActions = [
      {
        type: 'POST_FUELDAY_REQUEST',
        isLoading: true,
      },
      {
        type: 'POST_FUELDAY_REQUEST',
        isLoading: false,
      },
      {
        type: 'POST_USER_SUCCESS',
        isLoggedIn: true,
        user: mockResponseUser,
      },
    ];

    // create a mock of the store
    const store = mockStore({});

    // run the dispatch of postFuelDay.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(postFuelDay(0, true)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
