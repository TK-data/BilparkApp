module.exports = {
  attributes: {
    CarID: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    RegNr: {
      type: 'string',
      defaultsTo: null
    },
    Cas: {
      type: 'string',
      defaultsTo: null
    },
    Brand: {
      type: 'string',
      defaultsTo: null
    },
    Model: {
      type: 'string',
      defaultsTo: null
    },
    FuelType: {
      type: 'string',
      defaultsTo: null
    },
    RegYear: {
      type: 'int',
      defaultsTo: 0
    },
    VehicleGroup: {
      type: 'string',
      defaultsTo: null
    },
    Co2Emission: {
      type: 'float',
      defaultsTo: 0
    },
    NoxEmission: {
      type: 'float',
      defaultsTo: 0
    },
    FuelConsumption: {
      type: 'float',
      defaultsTo: 0
    },
    ParticleEmmision: {
      type: 'float',
      defaultsTo: 0,
    },
    NextVI: {
      type: 'date',
      defaultsTo: null
    },
    NextVINotification: {
      type: 'bit',
      defaultsTo: 0
    },
    InsuranceCompany: {
      type: 'string',
      defaultsTo: null
    }
  }
};
