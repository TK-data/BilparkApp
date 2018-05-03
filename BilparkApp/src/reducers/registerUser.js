const initialFormOptions = {
  auto: 'none',
  fields: {
    Email: {
      hasError: false,
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

const initialModalVisible = false;

const initialValue = {};

export function registerUserHasErrored(state = false, action) {
  switch (action.type) {
  case 'REGISTER_USER_HAS_ERRORED':
    return action.hasErrored;
  default:
    return state;
  }
}
export function registerUserIsLoading(state = false, action) {
  switch (action.type) {
  case 'REGISTER_USER_IS_LOADING':
    return action.isLoading;
  default:
    return state;
  }
}
export function users(state = [], action) {
  switch (action.type) {
  case 'REGISTER_USER_FETCH_DATA_SUCCESS':
    return action.users;
  default:
    return state;
  }
}

export function registerUserModalVisible(state = initialModalVisible, action) {
  switch (action.type) {
  case 'REGISTER_USER_MODAL_VISIBLE':
    return action.visible;
  default:
    return state;
  }
}

export function registerUserModalTransparent(state = true, action) {
  switch (action.type) {
  case 'REGISTER_USER_MODAL_TRANSPARENT':
    return action.modalTransparent;
  default:
    return state;
  }
}

export function options(state = initialFormOptions, action) {
  switch (action.type) {
  case 'REGISTER_USER_OPTIONS':
    return action.options;
  case 'REGISTER_USER_RESET_OPTIONS':
    return initialFormOptions;
  default:
    return state;
  }
}

export function values(state = initialValue, action) {
  switch (action.type) {
  case 'REGISTER_USER_VALUES':
    return action.values;
  default:
    return state;
  }
}
