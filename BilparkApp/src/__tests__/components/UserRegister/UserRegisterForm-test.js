import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import t from 'tcomb-form-native';

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
    console.log(render.text());
    expect(render.find(Form).exists());
    // expect(render.children().childAt(1).text())
    //  .toEqual('<Button />');
  });
});
