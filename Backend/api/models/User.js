/**
 * User.js
 *
 * @description :: User controller.
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
    Email: {
      type: 'string',
      required: true,
      unique: true,
      email: true,
    },
    Password: {
      type: 'string',
      required: true,
      minLength: 8,
      maxLength: 72,
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
    },

    toJSON: function() {
      let obj = this.toObject();
      // Do not expose password hash to the world
      delete obj.Password;
      return obj;
    },

    checkPassword: function (password, cb) {
      bcrypt.compare(password, this.Password, cb);
    },

  },

  /**
   * Hash password before storing new user
   */
  beforeCreate: function (user, cb) {
    bcrypt.hash(user.Password, 10, function (err, hash) {
      if (err) return cb(err);
      user.Password = hash;
      cb(); // Continue creation
    });
  }

};
