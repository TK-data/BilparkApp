import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import t from 'tcomb-form-native';
import { Button } from 'native-base';

import UserRegisterForm from '../../../components/UserRegister/UserRegisterForm';

const initialState = {
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
  values: {
    Email: 'test@mail.no',
    Fname: 'FnameTest',
    Lname: 'LnameTest',
    Address: 'AdrTest',
    Password: 'passwordTest',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing UserRegisterForm', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <UserRegisterForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  const wrapper = shallow(
    <UserRegisterForm />,
    { context: { store: mockStore(initialState) } },
  );
  const Form = t.form.Form;
  it('Containts the form', () => {
    const render = wrapper.dive().dive();
    expect(render.find(Form).exists());
  });
  it('Contains the register button', () => {
    const render = wrapper.dive().dive();
    expect(render.find(Button).exists());
  });
  it('Can press the register button', () => {
    const render = wrapper.dive().dive();
    const registerButton = render.find(Button);
    registerButton.simulate('press');
  });
  /*
  The following Object and test need to be worked on further
  Check Jira task TKDATA-184
  const User = {
    Email: 'test@mail.no',
    Fname: 'FnameTest',
    Lname: 'LnameTest',
    Address: 'AdrTest',
    Password: 'passwordTest',
  };
  */
  it('Can fill with values and register', () => {
    const render = wrapper.dive().dive();
    const form = render.find(Form);
    expect(form.exists());
    const registerButton = render.find(Button);
    registerButton.simulate('press');
  });
});
