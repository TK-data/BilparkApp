import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Form from '../../../components/registerVehicle/CarForm';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  carFetch: {
    hasErrored: false,
    isLoading: false,
    car: '',
    isAccepted: false,
  },
};


describe('Testing register car form', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <Form />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });

  const wrapper = shallow(
    <Form />,
    { context: { store: mockStore(initialState) } },
  );

  it('Contains a form', () => {
    const render = wrapper.dive().dive().dive();
    expect(render.find('Form').exists());
  });
});
