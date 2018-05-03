import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { API_ADDRESS } from '../../config/connections';
import { postUserFailure, postUserLoading, postUserSuccess, loginSuccess, logoutSuccess, postUser, postCurrent, logout, loginErrorFormOptions, loginResetFormOptions, loginMail } from '../../actions/auth';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create the correct action when calling postUserFailer', () => {
    const data = false;
    const expectedAction = {
      type: 'POST_USER_FAILURE',
      hasErrored: data,
      isLoggedIn: false,
    };

    expect(postUserFailure(data)).toEqual(expectedAction);
  });

  it('should create the correct action when calling postUserLoading', () => {
    const data = false;
    const expectedAction = {
      type: 'POST_USER_REQUEST',
      isLoading: data,
      isLoggedIn: false,
    };

    expect(postUserLoading(data)).toEqual(expectedAction);
  });

  it('should create the correct action when calling postUserSuccess', () => {
    const data = {
      Email: 'aaaa@a.com',
      Fname: 'er',
      Lname: 'ling',
      Address: 'krok 80',
      FuelNotification: true,
      UserID: 4,
      FuelDay: 5,
    };

    const expectedAction = {
      type: 'POST_USER_SUCCESS',
      isLoggedIn: true,
      user: data,
    };

    expect(postUserSuccess(data)).toEqual(expectedAction);
  });

  it('should create the correct action when calling loginSuccess', () => {
    const expectedAction = {
      type: 'LOGIN_SUCCESS',
    };

    expect(loginSuccess()).toEqual(expectedAction);
  });

  it('should create the correct action when calling logoutSuccess', () => {
    const data = true;
    const expectedAction = {
      type: 'LOGOUT_SUCCESS',
      isLoggedIn: !data,
    };

    expect(logoutSuccess(data)).toEqual(expectedAction);
  });

  it('should create the correct action when calling loginMail', () => {
    const data = {
      Epost: 'test@test.no',
    };
    const expectedAction = {
      type: 'LOGIN_MAIL',
      mail: data,
    };

    expect(loginMail(data)).toEqual(expectedAction);
  });

  it('should create the correct action when calling loginErrorFormOptions', () => {
    const expectedAction = {
      type: 'LOGIN_ERROR_FORM_OPTIONS',
    };

    expect(loginErrorFormOptions()).toEqual(expectedAction);
  });

  it('should create the correct action when calling loginResetFormOptions', () => {
    const expectedAction = {
      type: 'LOGIN_RESET_FORM_OPTIONS',
    };

    expect(loginResetFormOptions()).toEqual(expectedAction);
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
  const mockResponseUser = {
    Email: 'aaaa@a.com',
    Fname: 'er',
    Lname: 'ling',
    Address: 'krok 80',
    FuelNotification: true,
    UserID: 4,
    FuelDay: 5,
  };
  // first test, checks the actions added after running a successfull postUser
  it('should set the correct actions when calling the async login function', () => {

    // mocks that every post call to /api/user/login will have a 200 OK response
    // + user object from login response
    axiosMock.onPost().reply(200, mockResponseUser);

    // expected action should be postUserLoading(true) -> postUserLoading(false)
    // ->postUserSuccess(user) -> loginSuccess()
    const expectedActions = [
      {
        type: 'POST_USER_REQUEST',
        isLoading: true,
        isLoggedIn: false,
      },
      {
        type: 'POST_USER_REQUEST',
        isLoading: false,
        isLoggedIn: false,
      },
      {
        type: 'POST_USER_SUCCESS',
        isLoggedIn: true,
        user: mockResponseUser,
      },
      { mail: {},
        type: 'LOGIN_MAIL' },
      {
        type: 'LOGIN_RESET_FORM_OPTIONS',
      },
      {
        type: 'LOGIN_SUCCESS',
      },
    ];

    // create a mock of the store
    const store = mockStore({});

    // run the dispatch of postUser/login.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(postUser('aaaa@a.com', 'asdasdasd')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });

  });

  it('should set the correct actions when calling the async get current user function', () => {
    // mocks that every post call to /api/user/current will have a 200 OK response
    // + user object from current response
    axiosMock.onGet(API_ADDRESS + '/api/user/current').reply(200, mockResponseUser);

    // expected action should be postUserLoading(true) -> postUserLoading(false)
    // ->postUserSuccess(user) -> loginSuccess()
    const expectedActions = [
      {
        type: 'POST_USER_REQUEST',
        isLoading: true,
        isLoggedIn: false,
      },
      {
        type: 'POST_USER_REQUEST',
        isLoading: false,
        isLoggedIn: false,
      },
      {
        type: 'POST_USER_SUCCESS',
        isLoggedIn: true,
        user: mockResponseUser,
      },
      {
        type: 'LOGIN_SUCCESS',
      },
    ];


    // create a mock of the store
    const store = mockStore({});


    // run the dispatch of postUser/login.
    // then compare the actions expected with the ones in the mock store
    return store.dispatch(postCurrent()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set the correct actions when calling logout', () => {
    // mocks that every post call to /api/user/logout will have a 200 OK response
    axiosMock.onGet(API_ADDRESS + '/api/user/logout').reply(200, 'Logged out');


    const expectedActions = [
      {
        type: 'POST_USER_REQUEST',
        isLoading: true,
        isLoggedIn: false,
      },
      {
        type: 'POST_USER_REQUEST',
        isLoading: false,
        isLoggedIn: false,
      },
      {
        type: 'LOGOUT_SUCCESS',
        isLoggedIn: !true,
      },
    ];


    const store = mockStore({});

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });


});
