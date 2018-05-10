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
    itemType: {
      type: 'string',
      isIn: ['Wheel', 'Window', 'CarLight', 'FrontBumper', 'BackBumper', 'RightBodyWork', 'LeftBodyWork'],
      required: true,
    },
    damaged: {
      type: 'boolean',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },

  }
};
