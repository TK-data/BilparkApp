import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS } from '../../actions/registerCar';
import { carFetch } from '../../reducers/registerCar';

describe('Get car reducer tests', () => {

  it('Should handle GET_CAR_FAILURE', () => {
    expect(carFetch(false, {
      type: GET_CAR_FAILURE,
      hasErrored: true,
    })).toEqual({
      hasErrored: true,
      isLoading: false,
      car: '',
    });
  });

  it('Should handle GET_CAR_REQUEST start', () => {
    expect(carFetch(false, {
      type: GET_CAR_REQUEST,
      isLoading: true,
    })).toEqual({
      hasErrored: false,
      isLoading: true,
      car: '',
    });
  });

  it('Should handle GET_CAR_REQUEST done', () => {
    expect(carFetch(true, {
      type: GET_CAR_REQUEST,
      isLoading: false,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      car: '',
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
    expect(carFetch('', {
      type: GET_CAR_SUCCESS,
      car,
    })).toEqual({
      hasErrored: false,
      isLoading: false,
      car,
    });
  });
});
