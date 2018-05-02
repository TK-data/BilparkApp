module.exports = {


  getAll: function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      // find all user's FuellRefill objects
      FuelRefill.find({ UserID: req.session.UserID }).exec(function(err, object) {
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

      const FuelTime = req.param('FuelTime');
      const Price = req.param('Price');
      const Liters = req.param('Liters');

      // var dateReg = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
      var numberReg = /^[0-9]{0,5}[.]{0,1}[0-9]{0,5}?$/;

      if (Date.parse(FuelTime)) {
        params['FuelTime'] = new Date(FuelTime);
      } else {
        return res.badRequest('FuelTime must be a proper Date object');
      }
      if (Price.match(numberReg) && Price !== '.' && Price !== '') {
        params['Price'] = Price.toString();
      } else {
        return res.badRequest('Price must be an integer or float');
      }
      if (Liters.match(numberReg && Liters !== '.' && Liters !== '')) {
        params['Liters'] = Liters.toString();
      } else {
        return res.badRequest('Liters must be an integer or float');
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
  },

  remove: function(req, res) {
    if (req.session.authenticated && req.session.UserID) {
      if (req.param('RefillID') == undefined) {
        return res.badRequest('RefillID must be included');
      } else if (parseInt(req.param('RefillID')) % 1 !== 0) {
        return res.badRequest('RefillID must be an integer');
      }

      let params = {
        RefillID: parseInt(req.param('RefillID')),
        UserID: parseInt(req.session.UserID)
      };

      FuelRefill.destroy(params).exec(function(err, deletedRecords) {
        if (err) {
          return res.negotiate(err);
        }
        return res.json(deletedRecords);
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }

};
