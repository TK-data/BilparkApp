import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Modal } from 'react-native';

import UserRegisterModal from '../../../components/UserRegister/UserRegisterModal';

const initialState = {
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

describe('Testing UserRegisterModal', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <UserRegisterModal />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  const wrapper = shallow(
    <UserRegisterModal />,
    { context: { store: mockStore(initialState) } },
  );
  it('Containts the register succeed text field', () => {
    const render = wrapper.dive().dive();
    expect(render.find('RegisterModalTextField').exists());
  });
  it('Contains the register succeed message', () => {
    const render = wrapper.dive().dive();
    expect(render.children().childAt(0).dive().text())
      .toEqual('Registrering godkjent');
  });
  it('Contains the modal', () => {
    const modal = wrapper.find(Modal).first();
    expect(modal.exists());
  });
  it('Contains the go to login button', () => {
    const render = wrapper.dive().dive();
    expect(render.children().childAt(1).text())
      .toEqual('<Button />');
  });
  it('Can press the go to login button', () => {
    const render = wrapper.dive().dive();
    const loginButton = render.children().childAt(1);
    loginButton.simulate('press');
  });
});
