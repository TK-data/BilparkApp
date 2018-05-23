import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import LoginForm from '../../../components/login/LoginForm';

const initialState = {
  hasErrored: false,
  isLoading: true,
  auth: {
    hasErrored: false,
    isLoading: false,
    user: 'user',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing LoginForm', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <LoginForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
