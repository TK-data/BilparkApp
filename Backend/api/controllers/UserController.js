/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {
  /**
   * Log in a user with required parameters
   */
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

        // verified and user excists, store as logged in.
        req.session.UserID = user.UserID;
        req.session.authenticated = true;
        return res.json(user);
      });
    });
  },
  /**
   * Logout a user by resetting user id and authentication in session
   */
  logout: function(req, res) {
    req.session.UserID = null;
    req.session.authenticated = false;
    return res.ok('Logged out');
  },

  /**
   * Get user details of current user logged in. need to be authenticated and have UserID in session
   */
  current: function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      // find user object
      User.findOne(req.session.UserID).exec(function(err, user) {
        if (err) {
          return res.negotiate(err);
        }
        if (!user) {
          return res.notFound('User not found');
        }

        // return details
        return res.json(user);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }
};
