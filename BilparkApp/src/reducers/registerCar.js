import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_DECLINE, GET_CAR_ACCEPT, GET_CAR_FORM_RESET_OPTIONS } from '../actions/registerCar';

export const initialFormOptions = {
  auto: 'placeholders',
  fields: {
    Registreringsnummer: {
      error: 'Vennligst fyll inn et gyldig Registreringsnummer',
    },
  },
};

export const formErrorOptions = {
  auto: 'placeholders',
  fields: {
    Registreringsnummer: {
      hasError: true,
      error: 'Registreringsnummeret finnes ikke! Prøv på nytt.',
    },
  },
};

export const initialState = {
  hasErrored: false,
  isLoading: false,
  car: '',
  isAccepted: false,
  options: initialFormOptions,
};

export function carFetch(state = initialState, action) {
  switch (action.type) {
  case GET_CAR_FAILURE:
    return {
      hasErrored: action.hasErrored,
      isLoading: false,
      car: '',
      isAccepted: false,
      options: formErrorOptions,
    };
  case GET_CAR_REQUEST:
    return {
      hasErrored: false,
      isLoading: action.isLoading,
      car: '',
      isAccepted: false,
      options: initialFormOptions,
    };
  case GET_CAR_SUCCESS:
    return {
      hasErrored: false,
      isLoading: false,
      car: action.car,
      isAccepted: false,
      options: initialFormOptions,
    };
  case GET_CAR_ACCEPT:
    return {
      hasErrored: false,
      isLoading: false,
      car: state.car,
      isAccepted: action.isAccepted,
      options: initialFormOptions,
    };
  case GET_CAR_DECLINE:
    return {
      hasErrored: false,
      isLoading: false,
      car: '',
      isAccepted: false,
      options: initialFormOptions,
    };
  case GET_CAR_FORM_RESET_OPTIONS:
    return {
      options: initialFormOptions,
    };
  default:
    return state;
  }
}
