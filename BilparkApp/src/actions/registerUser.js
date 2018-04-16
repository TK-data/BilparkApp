import { API_ADDRESS } from '../config/connections';

export const REGISTER_USER_HAS_ERRORED = 'REGISTER_USER_HAS_ERRORED';
export const REGISTER_USER_IS_LOADING = 'REGISTER_USER_IS_LOADING';
export const REGISTER_USER_FETCH_DATA_SUCCESS = 'REGISTER_USER_FETCH_DATA_SUCCESS';
export const REGISTER_USER_MODAL_VISIBLE = 'REGISTER_USER_MODAL_VISIBLE';
export const REGISTER_USER_MODAL_TRANSPARENT = 'REGISTER_USER_MODAL_TRANSPARENT';
export const REGISTER_USER_OPTIONS = 'REGISTER_USER_OPTIONS';
export const REGISTER_USER_VALUES = 'REGISTER_USER_VALUES';

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
