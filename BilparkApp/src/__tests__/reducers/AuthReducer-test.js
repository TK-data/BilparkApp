import reducer from '../../reducers/auth';
import { POST_USER_FAILURE, LOGOUT_SUCCESS, POST_USER_REQUEST, POST_USER_SUCCESS } from '../../actions/auth';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ isLoggedIn: false });
  });

  it('should handle POST_USER_FAILURE', () => {
    expect(reducer([], {
      type: POST_USER_FAILURE,
      hasErrored: false,
      isLoggedIn: false,
    })).toEqual({
      isLoggedIn: false,
      hasErrored: false,
    });
  });

  it('should handle LOGOUT_SUCCESS', () => {
    expect(reducer([], {
      type: LOGOUT_SUCCESS,
      isLoggedIn: false,
    })).toEqual({
      isLoggedIn: false,
    });
  });

  it('should handle POST_USER_REQUEST start', () => {
    expect(reducer([], {
      type: POST_USER_REQUEST,
      isLoggedIn: false,
      isLoading: true,
    })).toEqual({
      isLoggedIn: false,
      isLoading: true,
    });
  });

  it('should handle POST_USER_REQUEST finished', () => {
    expect(reducer([], {
      type: POST_USER_REQUEST,
      isLoggedIn: false,
      isLoading: false,
    })).toEqual({
      isLoggedIn: false,
      isLoading: false,
    });
  });

  it('should handle POST_USER_SUCCESS', () => {
    const mockUser = {
      Email: 'ama@a.com',
      Fname: 'Erling',
      Lname: 'I',
      Address: 'Krok80',
      FuelNotification: true,
      UserID: 3,
      FuelDay: 0,
    };
    const mockCar = {
      CarID: '123',
    };
    expect(reducer([], {
      type: POST_USER_SUCCESS,
      isLoggedIn: true,
      user: mockUser,
      car: mockCar,
    })).toEqual({
      isLoggedIn: true,
      user: JSON.stringify(mockUser),
      car: JSON.stringify(mockCar),
    });
  });
});
