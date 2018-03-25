import { POST_USER_FAILURE, LOGOUT_SUCCESS, POST_USER_REQUEST, POST_USER_SUCCESS } from '../actions/auth';

// Skal currentUser kjøres her først? Usikker på hvor ofte initialAuthState kjøres.
// Om det bare er start eller hver gang noe kalles.
// Alternativt lagre user i localstorage.
// Kjør en test og finn ut hvor ofte dette kjøres.
const initialAuthState = { isLoggedIn: false };


function auth(state = initialAuthState, action) {
  switch (action.type) {
  case POST_USER_FAILURE:
    return {
      isLoggedIn: action.isLoggedIn,
      hasErrored: action.hasErrored,
    };
  case POST_USER_REQUEST:
    return {
      isLoggedIn: action.isLoggedIn,
      isLoading: action.isLoading,
    };
  case POST_USER_SUCCESS:
    return {
      isLoggedIn: action.isLoggedIn,
      user: action.user,
    };
  case LOGOUT_SUCCESS:
    return { isLoggedIn: action.isLoggedIn };
  default:
    return state;
  }
}

export default auth;
