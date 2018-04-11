import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

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
});
