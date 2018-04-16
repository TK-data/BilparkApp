import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import t from 'tcomb-form-native';
import { Button } from 'native-base';

import UserRegisterForm from '../../../components/UserRegister/UserRegisterForm';

const initialState = {
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
});
