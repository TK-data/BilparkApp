import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS, GET_CAR_ACCEPT, GET_CAR_DECLINE, GET_CAR_SAVE_FAILURE, GET_CAR_FORM_VALUE } from '../../actions/registerCar';
import { carFetch, carForm, initialState } from '../../reducers/registerCar';

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

  const carInitialState = Object.assign(initialState);
  carInitialState.car = car;

  it('Should handle GET_CAR_DECLINE', () => {
    expect(carFetch(carInitialState, {
      type: GET_CAR_DECLINE,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car: '',
      isAccepted: false,
    });
  });

  it('Should handle GET_CAR_ACCEPT', () => {
    expect(carFetch(carInitialState, {
      type: GET_CAR_ACCEPT,
      isAccepted: true,
    })).toEqual({
      hasErrored: '',
      isLoading: false,
      car,
      isAccepted: true,
    });
  });

  it('Should handle GET_CAR_SAVE_FAILURE', () => {
    expect(carFetch(carInitialState, {
      type: GET_CAR_SAVE_FAILURE,
      hasErrored: 'Noe gikk galt når bilen skulle lagres! Prøv igjen.',
    })).toEqual({
      hasErrored: 'Noe gikk galt når bilen skulle lagres! Prøv igjen.',
      isLoading: false,
      car: '',
      isAccepted: false,
    });
  });

  it('Should return the default state when no valid action is inputted to carFetch function', () => {
    expect(carFetch(initialState, {
      type: 'NONE',
    })).toEqual(initialState);
  });

  it('Should handle GET_CAR_FORM_VALUE', () => {
    expect(carForm({}, {
      type: GET_CAR_FORM_VALUE,
      carFormValue: 'VH12345',
    })).toEqual('VH12345');
  });

  it('Should return the default state when no valid action is inputted to carForm function', () => {
    expect(carForm({}, {
      type: 'NONE',
    })).toEqual({});
  });

});
