module.exports = {

  getAll: function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      // find all user's FuellRefill objects
      FuelRefill.find(req.session.UserID).exec(function(err, object) {
        if (err) {
          return res.negotiate(err);
        }
        if (!object) {
          return res.notFound('No refills found for user');
        }

        // return objects
        return res.json(object);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  },

  register: function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      let params = {
        UserID: req.session.UserID,
      };

      var dateReg = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;

      if (req.param('FuelTime') !== undefined) {
        if (req.param('FuelTime').match(dateReg)) {
          params['FuelTime'] = new Date(req.param('FuelTime'));
        } else {
          return res.badRequest('FuelTime must either be undefined or a proper Date object');
        }
      }

      FuelRefill.create(params).exec(function(err, fuelrefill) {
        if (err) {
          return res.negotiate(err);
        }

        // currently returns only the created object.
        return res.json(fuelrefill);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }

};
