/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

// using bcrypt to encrypt passwords in the database
const bcrypt = require('bcrypt');

module.exports = {
// UserID, CompanyID, CarID, Address, Fname, Lname, FuelDay, FuelTime, FuelNotification
  attributes: {
    // UserID, if not specified in the POST, it will be autoincremented
    UserID: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    CompanyID: {
      type: 'integer'
    },
    CarID: {
      type: 'integer'
    },
    Address: {
      type: 'string',
      required: true
    },
    Fname: {
      type: 'string',
      required: true
    },
    Lname: {
      type: 'string',
      required: true
    },
    FueldDay: {
      type: 'integer',
      min: 0,
      max: 6
    },
    FuelTime: {
      // time is deprecated, use datetime
      type: 'datetime'
    },
    FuelNotification: {
      type: 'boolean',
      defaultsTo: false
    }
  }
};
