import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import RegisterCompanyScreen from '../../../components/registerCompany/RegisterCompanyScreen';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing RegisterCompanyScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <RegisterCompanyScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
