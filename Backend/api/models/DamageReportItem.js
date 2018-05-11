/**
 * DamageReportItem.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    ItemID: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    DamageReportID: {
      type: 'integer',
      required: true,
    },
    ItemType: {
      type: 'string',
      required: true,
    },
    Damaged: {
      type: 'boolean',
      required: true,
    },
    Description: {
      type: 'string',
      required: false,
    },

  }
};
