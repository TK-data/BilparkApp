module.exports = {

  save: async function(req, res) {
    // Only logged in users can log car activity
    if (req.session.authenticated && req.session.UserID) {
      const UserID = req.session.UserID;

      const user = await User.findOne({UserID: UserID});

      if (!user) {
        return res.notFound('User not found');
      }
      let log = null;

      try {
        log = JSON.parse(req.body.drivingLog);
      }
      catch (err) {
        log = req.body.drivingLog;
      }

      log.UserID = UserID;
      log.CarID = user.CarID;

      console.log(log);

      const logItem = await DrivingLog.create(log);
      console.log(logItem);

      if (!logItem) {
        return res.serverError('Could not create log item');
      }
      return res.ok(logItem);
    } else {
      return res.forbidden('You are not logged in');
    }
  },

  getAll: function(req, res) {},


  remove: function(req, res) {}
};
