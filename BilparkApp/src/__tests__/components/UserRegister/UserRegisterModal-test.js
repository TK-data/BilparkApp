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
});
