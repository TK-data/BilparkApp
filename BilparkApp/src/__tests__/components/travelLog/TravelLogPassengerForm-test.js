import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import TravelLogPassengerForm from '../../../components/travelLog/TravelLogPassengerForm';

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

describe('Testing TravelLogPassengerForm', () => {
  it('Renders as expected', () => {
    const comp = shallow(
      <TravelLogPassengerForm />,
      { context: { store: mockStore(initialState) } },
    );
    expect(comp.dive()).toMatchSnapshot();
  });

  const wrapper = shallow(
    <TravelLogPassengerForm />,
    { context: { store: mockStore(initialState) } },
  );
  it('Can use the onChange function', () => {
    const value = {
      Passenger: '1',
      Passenger1: '',
      Passenger2: '',
      Passenger3: '',
      Passenger4: '',
      Passenger5: '',
    };
    wrapper.dive().instance().onChange(value);
  });
  it('Can be passenger from 1 to 5', () => {
    const value = {
      Passenger: '1',
      Passenger1: '',
      Passenger2: '',
      Passenger3: '',
      Passenger4: '',
      Passenger5: '',
    };
    for (let i = 1; i < 6; i += 1) {
      value.Passenger = i.toString();
      wrapper.dive().instance().onChange(value);
    }
  });
});
