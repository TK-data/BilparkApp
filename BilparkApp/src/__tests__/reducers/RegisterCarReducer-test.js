import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_ACCEPT, GET_CAR_DECLINE } from '../../actions/registerCar';
import { carFetch, initialState } from '../../reducers/registerCar';

describe('Get car reducer tests', () => {

  it('Should handle GET_CAR_FAILURE', () => {
    expect(carFetch(initialState, {
      type: GET_CAR_FAILURE,
      hasErrored: '',
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    });
  });

  it('Should handle GET_CAR_REQUEST start', () => {
    expect(carFetch(initialState, {
      type: GET_CAR_REQUEST,
      isLoading: true,
    })).toEqual({
      hasErrored: '',
      isLoading: true,
      car: '',
      isAccepted: false,
    });
  });

  it('Should handle GET_CAR_REQUEST done', () => {
    expect(carFetch(initialState, {
      type: GET_CAR_REQUEST,
      isLoading: false,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    });
  });

  it('Should handle GET_CAR_SUCCESS', () => {
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
    expect(carFetch(initialState, {
      type: GET_CAR_SUCCESS,
      car,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car,
      isAccepted: false,
    });
  });

  // The state now contains this car:
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

  const newInitialState = Object.assign(initialState);
  newInitialState.car = car;

  it('Should handle GET_CAR_DECLINE', () => {
    expect(carFetch(newInitialState, {
      type: GET_CAR_DECLINE,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    });
  });

  it('Should handle GET_CAR_ACCEPT', () => {
    expect(carFetch(newInitialState, {
      type: GET_CAR_ACCEPT,
      isAccepted: true,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car,
      isAccepted: true,
    });
  });

});
