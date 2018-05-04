module.exports = {
  attributes: {
    RefillID: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    UserID: {
      type: 'integer',
      required: true,
    },
    FuelTime: {
      type: 'datetime',
      required: true,
    },
    Price: {
      type: 'float',
      required: true,
    },
    Rate: {
      type: 'float',
      required: true,
    }
  }
};
