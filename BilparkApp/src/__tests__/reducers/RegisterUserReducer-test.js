import * as reducer from '../../reducers/registerUser';
import { REGISTER_USER_HAS_ERRORED, REGISTER_USER_IS_LOADING,
  REGISTER_USER_FETCH_DATA_SUCCESS, REGISTER_USER_MODAL_VISIBLE,
  REGISTER_USER_MODAL_TRANSPARENT, REGISTER_USER_OPTIONS, REGISTER_USER_VALUES } from '../../actions/registerUser';

describe('register user reducer', () => {
  it('should return the initial state', () => {
    expect(reducer.registerUserIsLoading({}, {})).toEqual({});
  });

  it('should handle REGISTER_USER_HAS_ERRORED', () => {
    expect(reducer.registerUserHasErrored(undefined, {
      type: REGISTER_USER_HAS_ERRORED,
      hasErrored: false,
    })).toEqual(false);
  });

  it('should handle REGISTER_USER_IS_LOADING', () => {
    expect(reducer.registerUserIsLoading(undefined, {
      type: REGISTER_USER_IS_LOADING,
      isLoading: true,
    })).toEqual(true);
  });

  it('should handle REGISTER_USER_FETCH_DATA_SUCCESS', () => {
    const mockUser = {
      Email: 'ama@a.com',
      Fname: 'Erling',
      Lname: 'I',
      Address: 'Krok80',
      FuelNotification: true,
      UserID: 3,
      FuelDay: 0,
    };
    expect(reducer.users(undefined, {
      type: REGISTER_USER_FETCH_DATA_SUCCESS,
      users: mockUser,
    })).toEqual(mockUser);
  });

  it('should handle REGISTER_USER_MODAL_VISIBLE', () => {
    expect(reducer.registerUserModalVisible(undefined, {
      type: REGISTER_USER_MODAL_VISIBLE,
      visible: true,
    })).toEqual(true);
  });

  it('should handle REGISTER_USER_MODAL_TRANSPARENT', () => {
    expect(reducer.registerUserModalTransparent(undefined, {
      type: REGISTER_USER_MODAL_TRANSPARENT,
      modalTransparent: true,
    })).toEqual(true);
  });

  it('should handle REGISTER_USER_OPTIONS', () => {
    expect(reducer.options(undefined, {
      type: REGISTER_USER_OPTIONS,
      options: { a: 1, b: 2 },
    })).toEqual({ a: 1, b: 2 });
  });

  it('should handle REGISTER_USER_VALUES', () => {
    expect(reducer.values(undefined, {
      type: REGISTER_USER_VALUES,
      values: { a: 1, b: 2 },
    })).toEqual({ a: 1, b: 2 });
  });
});
