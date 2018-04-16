import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Form from '../../components/registerVehicle/Form';
// import initialState from '../../reducers/registerCar';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  carFetch: {
    hasErrored: false,
    isLoading: false,
    car: '',
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

  it('Can click button and submit value', () => {
    const render = wrapper.dive().dive().dive().dive();
    const submitButton = render.find('TouchableOpacity');
    submitButton.simulate('press');
  });
});
