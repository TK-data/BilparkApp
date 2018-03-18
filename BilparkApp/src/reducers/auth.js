import { POST_USER_FAILURE, POST_USER_REQUEST, POST_USER_SUCCESS } from '../actions/auth';

const initialAuthState = { isLoggedIn: false };

function auth(state = initialAuthState, action) {
  switch (action.type) {
  case POST_USER_FAILURE:
    return { hasErrored: true };
  case POST_USER_REQUEST:
    return { isLoading: true };
  case POST_USER_SUCCESS:
    return { isLoggedIn: true };
  default:
    return state;
  }
}

export default auth;
