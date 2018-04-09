import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { postFuelDayFailure, postFuelDayLoading, postFuelDaySuccess, postFuelDay } from '../actions/fuelDay';

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
  const axiosMock = new MockAdapter(axios);
  afterEach(() => {
    axiosMock.reset();
    axiosMock.restore();
  });

  it('creates POST_USER_SUCCESS action when posting a fuelday is successfull', () => {
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
    const store = mockStore({});
    return store.dispatch(postFuelDay(0, false)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
