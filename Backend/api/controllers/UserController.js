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
  },
  //FuelDay, FuelTime, FuelNotification
  /**
   * update what weekday you want to get the push notification on.
   */
  notification: function(req, res) {
    // only logged in users can set when they want the notification
    if (req.session.authenticated && req.session.UserID) {
      // TODO: verify params.
      // FuelDay (0-6) 0= monday, 6 = sunday
      // FuelNotification is a bool if the frontend will create a local push notification when the recieve the user object.
      // true = create a notification, false = don't create a notification

      var FuelTime = req.param('FuelTime');
      var FuelDay = req.param('FuelDay');
      var FuelNotification = req.param('FuelNotification');

      let updatedNotification = {};


      if (FuelTime != undefined) {
        if (FuelTime.match(/^([01]?[0-9]|2[0-3])-[0-5][0-9]$/)) {
          return res.badRequest('Param FuelTime must match pattern HH-MM');
        }
        updatedNotification['FuelTime'] = FuelTime;
      }

      if (FuelDay != undefined) {
        if (!(FuelDay % 1 === 0) || FuelDay < 0 || FuelDay > 6) {
          return res.badRequest('Param FuelDay must be an integer between 0-6');
        }
        updatedNotification['FuelDay'] = parseInt(FuelDay);
      }

      if (FuelNotification != undefined) {
        if (FuelNotification !== 'true' && FuelNotification !== 'false') {
          return res.badRequest('FuelNotification must be either true or false');
        }
        updatedNotification['FuelNotification'] = FuelNotification;
      }


      // updates all user objects with the value UserID. Since it's unique it will return an array of 1 item.
      User.update(parseInt(req.session.UserID), updatedNotification).exec(function (err, user) {
        if (err) {
          return res.negotiate(err);
        }
        if (!user || user.length < 1) {
          return res.notFound('User not found');
        }

        // to make it easier for the frontend we just return the user object instead of the array.
        return res.json(user[0]);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }
};
