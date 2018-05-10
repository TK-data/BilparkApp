/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  UserController: {
    '*': false,
    create: true,
    find: 'adminAuth',
    findOne: 'adminAuth',
    destroy: 'adminAuth',
    populate: 'adminAuth',
    login: true,
    logout: true,
    current: true,
    notification: true,
  },
  DSMController: {
    '*': false,
    getCar: 'sessionAuth',
  },
  FuelRefillController: {
    '*': false,
    register: 'sessionAuth',
    getAll: 'sessionAuth',
    remove: 'sessionAuth',
  },
  CarController: {
    '*': false,
    save: 'sessionAuth',
    find: 'adminAuth',
    findOne: 'adminAuth',
    destroy: 'adminAuth',
    populate: 'adminAuth',
  },
  AdminController: {
    '*': false,
    create: 'adminAuth',
    login: true,
    logout: true,
  },
  DrivingLogController: {
    '*': false,
    find: 'adminAuth',
    save: 'sessionAuth',
    getAll: 'sessionAuth',
    remove: 'sessionAuth',
  },
};
