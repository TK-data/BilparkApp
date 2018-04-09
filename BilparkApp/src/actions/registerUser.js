import { API_ADDRESS } from '../config/connections';

export function registerHasErrored(bool) {
  return {
    type: 'REGISTER_HAS_ERRORED',
    hasErrored: bool,
  };
}

export function registerIsLoading(bool) {
  return {
    type: 'REGISTER_IS_LOADING',
    isLoading: bool,
  };
}

export function registerFetchDataSuccess(users) {
  return {
    type: 'REGISTER_FETCH_DATA_SUCCESS',
    users,
  };
}

export function errorAfterFiveSeconds() {
  // We return a function instead of an action object
  return (dispatch) => {
    setTimeout(() => {
      // This function is able to dispatch other action creators
      dispatch(registerHasErrored(true));
    }, 5000);
  };
}

export function registerModalVisible(bool) {
  return {
    type: 'REGISTER_MODAL_VISIBLE',
    visible: bool,
  };
}

export function registerModalTransparent(bool) {
  return {
    type: 'REGISTER_MODAL_TRANSPARENT',
    modalTransparent: bool,
  };
}

export function registerOptions(options) {
  return {
    type: 'REGISTER_OPTIONS',
    options,
  };
}

export function registerResetOptions() {
  return {
    type: 'REGISTER_RESET_OPTIONS',
  };
}

export function registerValues(values) {
  return {
    type: 'REGISTER_VALUES',
    values,
  };
}

export function registerResetOptionUpdateValue() {
  return (dispatch) => {
    dispatch(registerResetOptions());
  };
}

export function registerUpdateValue(values) {
  return (dispatch) => {
    dispatch(registerValues(values));
  };
}


export function registerFetchData(value) {
  return (dispatch) => {
    dispatch(registerIsLoading(true));
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
          dispatch(registerModalVisible(true));
          dispatch(registerOptions({
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
            dispatch(registerOptions({
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
            dispatch(registerValues(value));
            return { Error: 'Email' };
          }
          dispatch(registerOptions({
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
      .catch(() => dispatch(registerHasErrored(true)));
  };
}
