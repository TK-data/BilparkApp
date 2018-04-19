module.exports = {

  save: function(req, res) {
    // Only logged in users can save their car
    if (req.session.authenticated && req.session.UserID) {
      const car = JSON.parse(req.body.car);

      Car.create(car).exec(function (err, createdCar) {
        if (!err) {
          const carUpdate = {
            CarID: createdCar.carId,
          };

          User.update(parseInt(req.session.UserID), carUpdate).exec(function (err, user) {
            if (err) {
              return res.negotiate(err);
            }
            if (!user || user.length < 1) {
              return res.notFound('User not found');
            }
            return res.ok();
          });
        }
        else {
          throw err;
        }
      });
    } else {
      return res.forbidden('You are not logged in');
    }
  }
};
