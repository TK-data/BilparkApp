import { LOGIN_MAIL, LOGIN_ERROR_FORM_OPTIONS, LOGIN_RESET_FORM_OPTIONS } from '../actions/auth';

export function loginMail(state = {}, action) {
  switch (action.type) {
  case LOGIN_MAIL:
    return action.mail;
  default:
    return state;
  }
}

const initialFormOptions = {
  auto: 'placeholders',
  fields: {
    Epost: {
      hasError: false,
      error: 'Vennligst fyll inn en korrekt epost',
    },
    Passord: {
      error: 'Passord må ha minst 8 tegn',
      password: true,
      secureTextEntry: true,
    },
  },
};

const errorFormOptions = {
  auto: 'placeholders',
  fields: {
    Epost: {
      hasError: true,
      error: 'Epost eller passord er feil',
    },
    Passord: {
      error: 'Passord må ha minst 8 tegn',
      password: true,
      secureTextEntry: true,
    },
  },
};

export function loginOptions(state = initialFormOptions, action) {
  switch (action.type) {
  case LOGIN_ERROR_FORM_OPTIONS:
    return errorFormOptions;
  case LOGIN_RESET_FORM_OPTIONS:
    return initialFormOptions;
  default:
    return state;
  }
}
