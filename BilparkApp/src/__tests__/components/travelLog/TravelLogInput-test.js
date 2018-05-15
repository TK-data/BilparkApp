import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TravelLogInput from '../../../components/travelLog/TravelLogInput';

const initialState = {
  travelLog: {
    addressFrom: '',
    addressTo: '',
    cargoValue: {
      Cargo: false,
      Comment: '',
    },
    datepickerDate: '15.5.2018',
    datepickerVisible: false,
    distance: '0km',
    formType: true,
    formValue: {
      Passenger: '0',
      Passenger1: '',
      Passenger2: '',
      Passenger3: '',
      Passenger4: '',
      Passenger5: '',
    },
    positionFrom: '0',
    positionTo: '0',
  },
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing TravelLogInput', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <TravelLogInput />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });
});
