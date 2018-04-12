import { GET_CAR_FAILURE, GET_CAR_REQUEST, GET_CAR_SUCCESS } from '../../actions/registerCar';
import { carFetchFailure, carFetchLoading, carFetchSuccess } from '../../reducers/registerCar';

describe('Get car reducer tests', () => {

  it('Should handle GET_CAR_FAILURE', () => {
    expect(carFetchFailure(false, {
      type: GET_CAR_FAILURE,
      hasErrored: true,
    })).toEqual(true);
  });

  it('Should handle GET_CAR_REQUEST start', () => {
    expect(carFetchLoading(false, {
      type: GET_CAR_REQUEST,
      isLoading: true,
    })).toEqual(true);
  });

  it('Should handle GET_CAR_REQUEST done', () => {
    expect(carFetchLoading(true, {
      type: GET_CAR_REQUEST,
      isLoading: false,
    })).toEqual(false);
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
    expect(carFetchSuccess('', {
      type: GET_CAR_SUCCESS,
      car,
    })).toEqual(car);
  });
});
