/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

  'POST /api/dsm': 'DSMController.getCar',
  'POST /api/user/login': 'UserController.login',
  'GET /api/user/logout': 'UserController.logout',
  'GET /api/user/current': 'UserController.current',
  'POST /api/user/notification': 'UserController.notification',
  'POST /api/car/save': 'CarController.save',
  'GET /api/fuelrefill/getall': 'FuelRefillController.getAll',
  'POST /api/fuelrefill/register': 'FuelRefillController.register',
  'POST /api/fuelrefill/remove': 'FuelRefillController.remove',
  'POST /api/admin/login': 'AdminController.login',
  'GET /api/admin/logout': 'AdminController.logout',
  'POST /api/company/save': 'CompanyController.save',

};
