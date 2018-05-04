import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import FuelRefillForm from '../../../components/fuelRefill/FuelRefillForm';

const initialState = {
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing FuelRefillForm', () => {
  it('Needs to be created', () => {
    expect(true).toBe(true);
  });
  /* it('Renders as expected', () => {
    const comp = shallow(
      <FuelRefillForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
  */
});
