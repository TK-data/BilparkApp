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
      defaultsTo: function () {
        return new Date();
      }
    },
  }
};
