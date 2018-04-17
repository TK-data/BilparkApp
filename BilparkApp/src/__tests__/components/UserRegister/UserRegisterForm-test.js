import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import t from 'tcomb-form-native';
import { Button } from 'native-base';

import UserRegisterForm from '../../../components/UserRegister/UserRegisterForm';

const initialState = {
  options: {
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
  const User = {
    Email: 'test@mail.no',
    Fname: 'FnameTest',
    Lname: 'LnameTest',
    Address: 'AdrTest',
    Password: 'passwordTest',
  };
  it('Can fill with values and register', () => {
    const render = wrapper.dive().dive();
    const form = render.find(Form);
    // form.value = User;
    console.log(wrapper.props());
    // console.log(wrapper.props.values);
    // console.log(form.getValue());
    // console.log(Form.getValue());
    // console.log(form.getValue());
    const registerButton = render.find(Button);
    registerButton.simulate('press');
  });
});
