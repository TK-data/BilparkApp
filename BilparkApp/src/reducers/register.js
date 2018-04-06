const initialFormOptions = {
  fields: {
    Email: {
      hasError: false,
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
};

const initialModalVisible = false;

const initialValue = {};

export function registerHasErrored(state = false, action) {
  switch (action.type) {
  case 'REGISTER_HAS_ERRORED':
    return action.hasErrored;
  default:
    return state;
  }
}
export function registerIsLoading(state = false, action) {
  switch (action.type) {
  case 'REGISTER_IS_LOADING':
    return action.isLoading;
  default:
    return state;
  }
}
export function users(state = [], action) {
  switch (action.type) {
  case 'REGISTER_FETCH_DATA_SUCCESS':
    return action.users;
  default:
    return state;
  }
}

export function registerModalVisible(state = initialModalVisible, action) {
  switch (action.type) {
  case 'REGISTER_MODAL_VISIBLE':
    return action.visible;
  default:
    return state;
  }
}

export function registerModalTransparent(state = true, action) {
  switch (action.type) {
  case 'REGISTER_MODAL_TRANSPARENT':
    return action.modalTransparent;
  default:
    return state;
  }
}

export function options(state = initialFormOptions, action) {
  switch (action.type) {
  case 'REGISTER_OPTIONS':
    return action.options;
  case 'REGISTER_RESET_OPTIONS':
    return initialFormOptions;
  default:
    return state;
  }
}

export function values(state = initialValue, action) {
  switch (action.type) {
  case 'REGISTER_VALUES':
    return action.values;
  default:
    return state;
  }
}
