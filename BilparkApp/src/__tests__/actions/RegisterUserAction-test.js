import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { API_ADDRESS } from '../../config/connections';
import { registerUserHasErrored, registerUserIsLoading, registerUserModalVisible, registerUserModalTransparent, registerUserOptions, registerUserResetOptions, registerUserValues, registerUserFetchData, pleasefillcorrect, emailErrorFill } from '../../actions/registerUser';



const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {

  it('should create an action to tell if the register has errored', () => {
    const data = true;
    const expectedAction = {
      type: 'REGISTER_USER_HAS_ERRORED',
      hasErrored: true,
    };
    expect(registerUserHasErrored(data)).toEqual(expectedAction);
  });

  it('should create an action to tell if the register is loading', () => {
    const data = true;
    const expectedAction = {
      type: 'REGISTER_USER_IS_LOADING',
      isLoading: true,
    };
    expect(registerUserIsLoading(data)).toEqual(expectedAction);
  });

  it('should create an action to make the modal visible', () => {
    const data = true;
    const expectedAction = {
      type: 'REGISTER_USER_MODAL_VISIBLE',
      visible: true,
    };
    expect(registerUserModalVisible(data)).toEqual(expectedAction);
  });

  it('should create an action to make the modal transparent', () => {
    const data = true;
    const expectedAction = {
      type: 'REGISTER_USER_MODAL_TRANSPARENT',
      modalTransparent: true,
    };
    expect(registerUserModalTransparent(data)).toEqual(expectedAction);
  });

  it('should create an action to update the form options', () => {
    const data = {
      fields: {
        Email: {
          hasError: true,
          label: 'Epost',
          error: 'Eposten er allerede i bruk',
        },
        Fname: {
          label: 'Fornavn',
          error: 'Vennligst fyll inn fornavnet ditt',
        },
        Lname: {
          label: 'Etternavn',
          error: 'Vennligst fyll inn etternavnet ditt',
        },
        Address: {
          label: 'Adresse',
          error: 'Vennligst fyll inn adressen din',
        },
        Password: {
          label: 'Passord',
          error: 'Passord må ha minst 8 tegn',
          password: true,
          secureTextEntry: true,
        },
      },
    };
    const expectedAction = {
      type: 'REGISTER_USER_OPTIONS',
      options: data,
    };
    expect(registerUserOptions(data)).toEqual(expectedAction);
  });

  it('should create an action to make the form options go to initial state', () => {
    const expectedAction = {
      type: 'REGISTER_USER_RESET_OPTIONS',
    };
    expect(registerUserResetOptions()).toEqual(expectedAction);
  });

  it('should create an action to update register users values', () => {
    const values = {
      Email: 'test@test.no',
      Fname: 'tester',
      Lname: 'testesen',
      Address: 'Testen 123',
      Password: '12345678',
    };

    const expectedAction = {
      type: 'REGISTER_USER_VALUES',
      values,
    };
    expect(registerUserValues(values)).toEqual(expectedAction);
  });

});

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create actions to update register users values', () => {
    const values = {
      Email: 'test@test.no',
      Fname: 'tester',
      Lname: 'testesen',
      Address: 'Testen 123',
      Password: 'asdasdasd',
    };

    const responseBody = {
      Email: 'test@test.no',
      Fname: 'tester',
      Lname: 'testesen',
      Address: 'Testen 123',
      FuelDay: 0,
      FuelNotification: false,
      UserID: 6,
    };
    fetchMock.postOnce(API_ADDRESS + '/api/User', {status: 201, body: responseBody, headers: { 'content-type': 'application/json' } });

    const store = mockStore({});
    const expectedActions = [
      {
        type: 'REGISTER_USER_IS_LOADING',
        isLoading: true,
      },
      {
        type: 'REGISTER_USER_MODAL_VISIBLE',
        visible: true,
      },
      {
        type: 'REGISTER_USER_OPTIONS',
        options: pleasefillcorrect,
      },
      {
        hasErrored: true,
        type: 'REGISTER_USER_HAS_ERRORED',
      },

    ];

    return store.dispatch(registerUserFetchData(values)).then(() => {
      console.log(store.getActions());
      expect(store.getActions()).toEqual(expectedActions);
    });

  });
});
