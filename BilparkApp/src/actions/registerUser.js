import { API_ADDRESS } from '../config/connections';

export function registerUserHasErrored(bool) {
  return {
    type: 'REGISTER_USER_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function registerUserIsLoading(bool) {
  return {
    type: 'REGISTER_USER_IS_LOADING',
    isLoading: bool,
  };
}

export function registerUserFetchDataSuccess(users) {
  return {
    type: 'REGISTER_USER_FETCH_DATA_SUCCESS',
    users,
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(registerUserHasErrored(true));
    }, 5000);
  };
}

export function registerUserModalVisible(bool) {
  return {
    type: 'REGISTER_USER_MODAL_VISIBLE',
    visible: bool,
  };
}

export function registerUserModalTransparent(bool) {
  return {
    type: 'REGISTER_USER_MODAL_TRANSPARENT',
    modalTransparent: bool,
  };
}

export function registerUserOptions(options) {
  return {
    type: 'REGISTER_USER_OPTIONS',
    options,
  };
}

export function registerUserResetOptions() {
  return {
    type: 'REGISTER_USER_RESET_OPTIONS',
  };
}

export function registerUserValues(values) {
  return {
    type: 'REGISTER_USER_VALUES',
    values,
  };
}

export function registerUserResetOptionUpdateValue() {
  return (dispatch) => {
    dispatch(registerUserResetOptions());
  };
}

export function registerUserUpdateValue(values) {
  return (dispatch) => {
    dispatch(registerUserValues(values));
  };
}


export function registerUserFetchData(value) {
  return (dispatch) => {
    dispatch(registerUserIsLoading(true));
    fetch(API_ADDRESS + '/api/User', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(registerUserModalVisible(true));
          dispatch(registerUserOptions({
            fields: {
              Email: {
                label: 'Epost',
                error: 'Vennligst fyll inn en korrekt epost',
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
          }));
          return response.status;
        } else if (response.status !== 201) {
          if (JSON.parse(response._bodyText).invalidAttributes.Email) {
            dispatch(registerUserOptions({
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
            }));
            dispatch(registerUserValues(value));
            return { Error: 'Email' };
          }
          dispatch(registerUserOptions({
            fields: {
              Email: {
                label: 'Epost',
                error: 'Vennligst fyll inn en korrekt epost',
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
          }));
          return response.status;
        }
        return response.json();
      })
      .then(response => response.json())
      .catch(() => dispatch(registerUserHasErrored(true)));
  };
}
