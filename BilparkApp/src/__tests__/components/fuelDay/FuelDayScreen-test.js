import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelDayScreen from '../../../components/fuelDay/FuelDayScreen';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelDayScreen', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <FuelDayScreen />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
