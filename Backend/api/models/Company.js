module.exports = {
  attributes: {
    CompanyID: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    CompanyName: {
      type: 'string',
      defaultsTo: null
    },
  }
};
