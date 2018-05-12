/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  login: function(req, res) {
    // check if a requested email excists
    User.findOne({Email: req.param('Email')}).exec(function(err, user) {
      if (err) {
        return res.negotiate(err);
      }
      if (!user) {
        return res.notFound('User not found');
      }

      // check if provided password hashed matches with stored hashed password
      user.checkPassword(req.param('Password'), function(err, verified) {
        if (err) {
          res.negotiate(err);
        }
        if (!verified) {
          return res.forbidden();
        }
        // valid user account logged into, check if it has admin
        Admin.findOne(user.UserID).exec(function(err, admin) {
          if (err) {
            return res.negotiate(err);
          }
          if (!admin) {
            return res.notFound('User account does not have admin priviledges');
          }

          // valid admin account, set as logged in admin
          req.session.UserID = user.UserID;
          req.session.authenticated = true;
          req.session.adminAuthenticated = true;

          let response = {
            user,
            admin
          };
          return res.json(response);
        });
      });
    });
  },

  logout: function(req, res) {
    req.session.UserID = null;
    req.session.authenticated = false;
    req.session.adminAuthenticated = false;
    return res.ok('Logged out');
  },

};
