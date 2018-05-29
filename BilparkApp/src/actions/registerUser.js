import { API_ADDRESS } from '../config/connections';

import { postUser } from './auth';

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

export const pleasefillcorrect = {
  auto: 'none',
  fields: {
    Email: {
      placeholder: 'Epost',
      error: 'Vennligst fyll inn en korrekt epost',
    },
    Fname: {
      placeholder: 'Fornavn',
      error: 'Vennligst fyll inn fornavnet ditt',
    },
    Lname: {
      placeholder: 'Etternavn',
      error: 'Vennligst fyll inn etternavnet ditt',
    },
    Address: {
      placeholder: 'Adresse',
      error: 'Vennligst fyll inn adressen din',
    },
    Password: {
      placeholder: 'Passord',
      error: 'Passord må ha minst 8 tegn',
      password: true,
      secureTextEntry: true,
    },
  },
};

export const emailErrorFill = {
  auto: 'none',
  fields: {
    Email: {
      hasError: true,
      placeholder: 'Epost',
      error: 'Eposten er allerede i bruk',
    },
    Fname: {
      placeholder: 'Fornavn',
      error: 'Vennligst fyll inn fornavnet ditt',
    },
    Lname: {
      placeholder: 'Etternavn',
      error: 'Vennligst fyll inn etternavnet ditt',
    },
    Address: {
      placeholder: 'Adresse',
      error: 'Vennligst fyll inn adressen din',
    },
    Password: {
      placeholder: 'Passord',
      error: 'Passord må ha minst 8 tegn',
      password: true,
      secureTextEntry: true,
    },
  },
};

export function routeToCompanyScreen() {
  return {
    type: 'ROUTE_COMPANY_SCREEN',
  };
}


export function registerUserFetchData(value) {
  return (dispatch) => {
    dispatch(registerUserIsLoading(true));
    return fetch(API_ADDRESS + '/api/User', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.status === 201) {
          // dispatch(registerUserModalVisible(true));
          // dispatch(routeToCompanyScreen());
          dispatch(postUser(value.Email, value.Password));
          dispatch(registerUserOptions(pleasefillcorrect));
          dispatch(registerUserValues({}));
          return response.status;

        } else if (response.status !== 201) {
          if (response.status === 400) {
            dispatch(registerUserOptions(emailErrorFill));
            dispatch(registerUserValues(value));
            return { Error: 'Email' };
          }
          dispatch(registerUserOptions(pleasefillcorrect));
          return response.status;
        }
        return response.json();
      })
      .then(response => response.json())
      .catch(() => {
        dispatch(registerUserHasErrored(true));
      });
  };
}
