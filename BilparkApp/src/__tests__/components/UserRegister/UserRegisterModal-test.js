import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserRegisterModal from '../../../components/UserRegister/UserRegisterModal';

const initialState = {
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
    /* render.children().forEach((child) => {
      // console.log(child.dive().text());
      console.log(child.dive().find('Text').dive().text());
    }); */
    /*
    expect(render.children().childAt(1).dive().find('Text')
      .dive()
      .text()
      .toBe('Registrering godkjent'));
      */
  });
});
