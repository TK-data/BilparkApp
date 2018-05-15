import {
  POST_FUELREFILL_REQUEST, POST_FUELREFILL_SUCCESS, POST_FUELREFILL_FAILURE,
  REMOVE_FUELREFILL, REGISTER_FUELREFILL,
} from '../../actions/fuelRefill';

import { initialState, fuelRefill } from '../../reducers/fuelRefill';

describe('fuelRefill reducer tests', () => {
  it('Should handle REGISTER_FUELREFILL', () => {
    const state = Object.assign({}, initialState);
    const fuelrefill =
      {
        FuelTime: '24-05-2018',
        Rate: 8.5,
        Price: 45,
        RefillID: 2,
      };
    expect(fuelRefill(state, {
      type: REGISTER_FUELREFILL,
      RefillItem: fuelrefill,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      fuelRefills: [
        {
          FuelTime: '24-05-2018',
          Rate: 8.5,
          Price: 45,
          RefillID: 2,
        },
      ],
    });
  });
  it('Should handle POST_FUELREFILL_FAILURE', () => {
    expect(fuelRefill(initialState, {
      type: POST_FUELREFILL_FAILURE,
      hasErrored: true,
    })).toEqual({
      hasErrored: true,
      isLoading: false,
      fuelRefills: [],
    });
  });
  it('Should handle POST_FUELREFILL_REQUEST', () => {
    expect(fuelRefill(initialState, {
      type: POST_FUELREFILL_REQUEST,
      isLoading: true,
    })).toEqual({
      hasErrored: false,
      isLoading: true,
      fuelRefills: [],
    });
  });
  it('Should handle POST_FUELREFILL_SUCCESS', () => {
    const state = Object.assign({}, initialState);
    const fuelrefills = [
      {
        FuelTime: '24-03-2018',
        Rate: 5,
        Price: 10,
        RefillID: 0,
      },
      {
        FuelTime: '24-05-2018',
        Rate: 8.5,
        Price: 45,
        RefillID: 2,
      },
    ];
    expect(fuelRefill(state, {
      type: POST_FUELREFILL_SUCCESS,
      fuelRefills: fuelrefills,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      fuelRefills: fuelrefills,
    });
  });
  it('Should handle REMOVE_FUELREFILL', () => {
    const state = Object.assign({}, initialState);
    const fuelrefills = [
      {
        FuelTime: '24-03-2018',
        Rate: 5,
        Price: 10,
        RefillID: 0,
      },
      {
        FuelTime: '24-05-2018',
        Rate: 8.5,
        Price: 45,
        RefillID: 2,
      },
    ];
    state.fuelRefills = fuelrefills;
    expect(fuelRefill(state, {
      type: REMOVE_FUELREFILL,
      RefillID: 0,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      fuelRefills: [
        {
          FuelTime: '24-05-2018',
          Rate: 8.5,
          Price: 45,
          RefillID: 2,
        },
      ],
    });
  });
  it('Should handle LOGOUT_SUCCESS', () => {
    expect(fuelRefill(initialState, {
      type: 'LOGOUT_SUCCESS',
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      fuelRefills: [],
    });
  });
  it('Should handle default', () => {
    expect(fuelRefill(initialState, {})).toEqual({
      hasErrored: false,
      isLoading: false,
      fuelRefills: [],
    });
  });

});
