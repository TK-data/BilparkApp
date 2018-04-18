import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { carFetchFailure, carFetchSuccess, carFetchLoading, carDeclined, carAccepted, getCar, declineCar, GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_ACCEPT, GET_CAR_DECLINE } from '../../actions/registerCar';

const axios = require('axios');

const MockAdapter = require('axios-mock-adapter');

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Register car actions', () => {
  it('Should create an action when car fetch fails', () => {
    const expectedAction = {
      type: GET_CAR_FAILURE,
      hasErrored: true,
    };
    expect(carFetchFailure(true)).toEqual(expectedAction);
  });

  it('Should create an action to show that a car fetch is loading', () => {
    const expectedAction = {
      type: GET_CAR_REQUEST,
      isLoading: true,
    };
    expect(carFetchLoading(true)).toEqual(expectedAction);
  });

  it('Should create an action to decline a fetched car', () => {
    const expectedAction = {
      type: GET_CAR_DECLINE,
    };
    expect(carDeclined()).toEqual(expectedAction);
  });

  it('Should create an action to accept a fetched car', () => {
    const expectedAction = {
      type: GET_CAR_ACCEPT,
      isAccepted: true,
    };
    expect(carAccepted(true)).toEqual(expectedAction);
  });

  it('should create an action to update the car object in the store when a car is fetched', () => {
    const car = {
      Regnr: 'VH12345',
      Cas: '7372474233932',
      Brand: 'Ford',
      Model: 'C-max',
      FuelType: 'Bensin',
      RegYear: 2015,
      VehicleGroup: 'Personbil',
      Co2Emission: 1.2,
      NoxEmission: 5.3,
      FuelConsumption: 5.7,
      ParticleEmmision: 1.7,
      NextVI: 2019,
      InsuranceCompany: 'IF',
    };
    const expectedAction = {
      type: 'GET_CAR_SUCCESS',
      car,
    };
    expect(carFetchSuccess(car)).toEqual(expectedAction);
  });
});

describe('Get car async actions', () => {
  let axiosMock = new MockAdapter(axios);

  afterEach(() => {
    axiosMock = new MockAdapter(axios);
  });

  it('Creates GET_CAR_SUCCESS action when getting a car is successful', () => {

    const car = JSON.stringify({
      Regnr: 'VH12345',
      Cas: '7372474233932',
      Brand: 'Ford',
      Model: 'C-max',
      FuelType: 'Bensin',
      RegYear: 2015,
      VehicleGroup: 'Personbil',
      Co2Emission: 1.2,
      NoxEmission: 5.3,
      FuelConsumption: 5.7,
      ParticleEmmision: 1.7,
      NextVI: 2019,
      InsuranceCompany: 'IF',
    });

    axiosMock.onPost().reply(200, car);

    const expectedActions = [
      {
        type: GET_CAR_REQUEST,
        isLoading: true,
      },
      {
        type: GET_CAR_SUCCESS,
        car,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getCar('VH12345')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('Creates GET_CAR_FAILURE action when getting a car is unsuccessful', () => {

    axiosMock.onPost().reply(404);

    const expectedActions = [
      {
        type: GET_CAR_REQUEST,
        isLoading: true,
      },
      {
        type: GET_CAR_FAILURE,
        hasErrored: true,
      },
    ];

    const store = mockStore({});

    return store.dispatch(getCar('12345')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
