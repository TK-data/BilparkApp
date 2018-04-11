import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import UserRegisterScreen from '../../../components/UserRegister/UserRegisterScreen';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing register car form', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <UserRegisterScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
